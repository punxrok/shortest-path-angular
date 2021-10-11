import { Injectable } from '@angular/core';
import { Cell } from './maze.component';
import { MazeCellsPositioner } from "./maze-cells-positioner";

export class PathFinder {

  constructor(
    private cellPositioner: MazeCellsPositioner,
    private matrix: Cell[][]
  ) {
  }

  public findPath() {
    const start = this.cellPositioner.startCell;


  }


}
