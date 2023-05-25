import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'impresion',
    loadChildren: () => import('./impresion/impresion.module').then(m => m.ImpresionModule)
  },
  {
    path: 'wyse',
    loadChildren: () => import('./wyse/wyse.module').then(m => m.WyseModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
