import { Injectable } from "@angular/core";
import { Cell } from "./cell";
import { CellType } from "./cell-type";


@Injectable({ providedIn: 'root' })
export class PathFinder {

  public drawPath(finishCell: Cell): void {
    if (finishCell === undefined) {
      throw new Error('finish cell is undefined');
    }

    let currentCell: Cell = finishCell;
    while (currentCell.type !== CellType.Start) {
      currentCell.isOnThePath = true;
      if (currentCell.previous !== undefined) {
        currentCell = currentCell.previous;
      } else {
        break;
      }
    }

  }

}
