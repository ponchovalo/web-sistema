import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeImpresionComponent } from './pages/home-impresion/home-impresion.component';
import { InventarioImpresionComponent } from './pages/inventario-impresion/inventario-impresion.component';

const routes: Routes = [
    {
      path:'',
      component: HomeImpresionComponent,
      children: [
        {
            path: 'inventario',
            component: InventarioImpresionComponent
        },
        
      ]
    }
  ]
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports:[
      RouterModule
    ]
  })
  export class ImpresionRoutingModule { }