import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeImpresionComponent } from './pages/home-impresion/home-impresion.component';
import { InventarioImpresionComponent } from './pages/inventario-impresion/inventario-impresion.component';
import { AlmacenImpresionComponent } from './pages/almacen-impresion/almacen-impresion.component';
import { ControlTonerComponent } from './pages/control-toner/control-toner.component';

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
          path: 'controltoner',
          component: ControlTonerComponent
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
