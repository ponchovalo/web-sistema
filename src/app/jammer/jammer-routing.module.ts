import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeJammerComponent } from './pages/home-jammer/home-jammer.component';
import { InventarioJammerComponent } from './pages/inventario-jammer/inventario-jammer.component';

const routes: Routes = [
    {
      path: '',
      component: HomeJammerComponent,
      children: [
        {
          path: 'inventario',
          component: InventarioJammerComponent
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
export class JammerRoutingModule { }
