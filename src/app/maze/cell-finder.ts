import { Injectable } from '@angular/core';
import { CellType } from "./cell-type";
import { Cell } from "./cell";
import { MazeCellsPositioner } from "./maze-cells-positioner";
import { Queue } from '../abstractions/queue';

export class CellFinder {

  private readonly neighboors = new Array<[col: number, row: number]>(
    [-1, 0],   // up
    [1, 0],  // down
    [0, 1],  // right
    [0, -1], // left
  );
  private visitedCells: number[][];
  private readonly queue = new Queue<Cell>();
  constructor(
    private cellPositioner: MazeCellsPositioner,
    private matrix: Cell[][]
  ) {

    this.visitedCells = new Array(matrix.length)
      .fill(0)
      .map(() =>
        new Array(matrix.length).fill(0)
      );
  }

  public findFinishCell(): Cell | undefined {
    if (this.cellPositioner.startCell === undefined) {
      throw new Error('start cell is undefined');
    }
    this.queue.enqueue(this.cellPositioner.startCell);

    while (this.queue.size() > 0) {
      const cell = <Cell>this.queue.dequeue();
      this.visitedCells[cell.position.col][cell.position.row] = 1;

      console.log(`[**************DEQUEUEING: ${cell.position.col}, ${cell.position.row}]`)

      if (cell.type === CellType.Finish) {
        console.log('We found a finish', cell);
        return cell;
      }
      for (const [col, row] of this.neighboors) {
        const [c, r] = [cell.position.col + col, cell.position.row + row];

        if (c < 0 || c > this.matrix.length - 1) {
          continue;
        }
        if (r < 0 || r > this.matrix[0].length - 1) {
          continue;
        }

        const neighboringCell = this.matrix[c][r];

        if (this.visitedCells[c][r] === 0 && neighboringCell.type !== CellType.Obstacle) {

          this.visitedCells[neighboringCell.position.col][neighboringCell.position.row] = 1;
          // console.log(`[${neighboringCell.position.col}, ${neighboringCell.position.row}] <== [${cell.position.col}, ${cell.position.row}]`)
          neighboringCell.previous = cell;
          this.queue.enqueue(neighboringCell);
        }
      }
    }
    return undefined;
  }
}


