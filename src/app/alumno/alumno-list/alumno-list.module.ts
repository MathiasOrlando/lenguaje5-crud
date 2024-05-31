import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoListPageRoutingModule } from './alumno-list-routing.module';

import { AlumnoListPage } from './alumno-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoListPageRoutingModule
  ],
  declarations: [AlumnoListPage]
})
export class AlumnoListPageModule {}
