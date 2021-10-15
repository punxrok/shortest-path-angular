import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MazeCellsPositioner } from './maze-cells-positioner';
import { CellFinder } from './cell-finder';
import { Cell } from './cell';
import { CellType } from './cell-type';
import { PathFinder } from './path-finder';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MazeComponent implements OnInit {

  public CellType = CellType;
  public matrix: Cell[][];
  private matrixCellsPositioner = new MazeCellsPositioner();
  private cellFinder: CellFinder;
  constructor(
    private readonly pathFinder: PathFinder
  ) {

    this.matrix = new Array<Array<Cell>>();
    for (let i = 0; i < 25; i++) {
      this.matrix[i] = new Array<Cell>();
      for (let j = 0; j < 25; j++) {
        this.matrix[i].push(new Cell(CellType.Road, i, j));
      }
    }

    this.cellFinder = new CellFinder(this.matrixCellsPositioner, this.matrix);

    console.log(this.matrix)
  }

  ngOnInit(): void {
  }

  public onClick(c: Cell): void {
    console.log('cell clicked:', c);
    this.matrixCellsPositioner.set(c);
  }

  public findPath() {
    const finishCell = this.cellFinder.findFinishCell();
    if (finishCell !== undefined)
      this.pathFinder.drawPath(finishCell);
  }

}


