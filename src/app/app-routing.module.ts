import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MazeComponent } from './maze/maze.component';



const routes: Routes = [
  { path: 'maze', component: MazeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
