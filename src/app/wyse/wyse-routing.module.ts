import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeWyseComponent } from './pages/home-wyse/home-wyse.component';
import { InventarioWyseComponent } from './pages/inventario-wyse/inventario-wyse.component';

const routes: Routes = [
  {
    path: '',
    component: HomeWyseComponent,
    children: [
      {
        path: 'inventario',
        component: InventarioWyseComponent
      },
      {
        path: '**',
        redirectTo: 'inventario'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WyseRoutingModule { }
