import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MazeCellsPositioner } from './maze-cells-positioner';
import { PathFinder } from './path-finder';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MazeComponent implements OnInit {

  // public maze: string[][] = new Array(25)
  //   .fill('0')
  //   .map(() =>
  //     new Array(25).fill('0')
  //   );

  public CellType = CellType;
  public matrix: Cell[][];
  private matrixCellsPositioner = new MazeCellsPositioner();
  private pathFinder: PathFinder;
  constructor() {

    this.matrix = new Array<Array<Cell>>();
    for (let i = 0; i < 25; i++) {
      this.matrix[i] = new Array<Cell>();
      for (let j = 0; j < 25; j++) {
        this.matrix[i].push(new Cell(CellType.Road, i, j));
      }
    }

    this.pathFinder = new PathFinder(this.matrixCellsPositioner, this.matrix);

    console.log(this.matrix)
  }

  ngOnInit(): void {
  }

  public onClick(c: Cell): void {
    console.log('cell clicked:', c);
    this.matrixCellsPositioner.set(c);
  }

  public findPath() {
    this.pathFinder.findPath();
  }

}

export class Cell {

  constructor(type: CellType, row: number, column: number) {
    this.type = type;
    this.position = { row: row, col: column };
  }
  public type: CellType;
  public position: { row: number, col: number };
  public previous?: Cell;

}

export enum CellType {
  Road,
  Obstacle,
  Start,
  Finish
}


