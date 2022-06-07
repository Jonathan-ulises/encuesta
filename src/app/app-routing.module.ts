import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'encuesta',
    component: EncuestaComponent
  },
  {
    path: '**',
    component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
