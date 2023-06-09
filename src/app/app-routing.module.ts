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
  },
  {
    path: 'jammer',
    loadChildren: () => import('./jammer/jammer.module').then(m => m.JammerModule)
  },
  {
    path: '**',
    redirectTo: 'wyse'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
