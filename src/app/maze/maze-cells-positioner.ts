import { CellType, Cell } from './maze.component';


export class MazeCellsPositioner {
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
