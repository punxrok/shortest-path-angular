import { CellType } from "./cell-type";


export class Cell {

  private _isOnThePath: boolean = false;

  constructor(type: CellType, column: number, row: number) {
    this.type = type;
    this.position = { col: column, row: row };
  }
  public type: CellType;
  public position: { col: number; row: number; };
  public previous?: Cell;

  public set isOnThePath(v: boolean) {
    this._isOnThePath = v;
  }

  public get isOnThePath(): boolean {
    return this._isOnThePath;
  }

}
