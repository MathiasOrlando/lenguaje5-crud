import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoEditPage } from './alumno-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoEditPageRoutingModule {}
