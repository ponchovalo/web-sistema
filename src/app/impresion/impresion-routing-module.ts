import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeImpresionComponent } from './pages/home-impresion/home-impresion.component';
import { InventarioImpresionComponent } from './pages/inventario-impresion/inventario-impresion.component';
import { AlmacenImpresionComponent } from './pages/almacen-impresion/almacen-impresion.component';

const routes: Routes = [
    {
      path:'',
      component: HomeImpresionComponent,
      children: [
        {
            path: 'inventario',
            component: InventarioImpresionComponent
        },
        {
          path: 'almacen',
          component: AlmacenImpresionComponent
        },
        {
          path: '**',
          redirectTo: 'inventario'
        }
        
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