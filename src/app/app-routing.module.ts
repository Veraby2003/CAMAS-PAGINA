import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { ComponenteConRectangulosComponent } from './areahab/areahab.component';
import { ComponenteConPalabrasComponent } from './componente-con-palabras/componente-con-palabras.component';
import { Habitacion1Component } from './habitacion1/habitacion1.component';
import { Habitacion2Component } from './habitacion2/habitacion2.component';
import { Habitacion3Component } from './habitacion3/habitacion3.component';
import { Habitacion4Component } from './habitacion4/habitacion4.component';

const routes: Routes = [
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'registro', loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent) },
  { path: 'rectangulos', loadComponent: () => import('./areahab/areahab.component').then(m => m.ComponenteConRectangulosComponent) },
  { path: 'palabras', component: ComponenteConPalabrasComponent },
  { path: 'habitacion1', loadComponent: () => import('./habitacion1/habitacion1.component').then(m => m.Habitacion1Component) },
  { path: 'habitacion2', loadComponent: () => import('./habitacion2/habitacion2.component').then(m => m.Habitacion2Component) },
  { path: 'habitacion3', loadComponent: () => import('./habitacion3/habitacion3.component').then(m => m.Habitacion3Component) },
  { path: 'habitacion4', loadComponent: () => import('./habitacion4/habitacion4.component').then(m => m.Habitacion4Component) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
