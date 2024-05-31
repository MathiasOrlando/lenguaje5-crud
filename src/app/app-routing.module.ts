import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'alumno-edit/:id',
    loadChildren: () => import('./alumno/alumno-edit/alumno-edit.module').then(m => m.AlumnoEditPageModule)
  },
  {
    path: 'alumno-list',
    loadChildren: () => import('./alumno/alumno-list/alumno-list.module').then(m => m.AlumnoListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
