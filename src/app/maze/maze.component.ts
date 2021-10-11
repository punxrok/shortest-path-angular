import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
  private matrixCellsPositioner = new MatrixCellsPositioner();
  constructor() {

    this.matrix = new Array<Array<Cell>>();
    for (let i = 0; i < 25; i++) {
      this.matrix[i] = new Array<Cell>();
      for (let j = 0; j < 25; j++) {
        this.matrix[i].push(new Cell(CellType.Road, i, j));
      }
    }

    console.log(this.matrix)
  }

  ngOnInit(): void {
  }

  public onClick(c: Cell): void {
    console.log('cell clicked:', c);
    this.matrixCellsPositioner.set(c);
  }

  public findPath() {
    const start = this.matrixCellsPositioner.startCell
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

export class MatrixCellsPositioner {
  private matrixItemsQueue = this.createMatrixItemsQueue();
  private modifiedCells = new Map<CellType, Cell[]>();

  get startCell(): Cell | undefined {
    if (!this.modifiedCells.has(CellType.Start)) {
      return undefined;
    }
    const c = <Cell[]>this.modifiedCells.get(CellType.Start);
    return c[0];
  }

  private createMatrixItemsQueue() {
    return new Array<CellType>(CellType.Obstacle, CellType.Finish, CellType.Start);
  }

  public set(cell: Cell) {
    if (this.matrixItemsQueue.length > 1) {
      cell.type = <CellType>this.matrixItemsQueue.pop();
    }
    else {
      cell.type = <CellType>this.matrixItemsQueue[0];
    }
    const curr = this.modifiedCells.get(cell.type);

    if (!!curr) {
      curr.push(cell);
    } else {
      this.modifiedCells.set(cell.type, [cell]);
    }
  }

  public reset() {
    this.modifiedCells.forEach(e => {
      e.forEach(c => c.type = CellType.Road);
    });

    this.modifiedCells.clear();
    this.matrixItemsQueue = this.createMatrixItemsQueue();
  }
}
