import { Component } from '@angular/core';

@Component({
  selector: 'app-edicion-impresora',
  templateUrl: './edicion-impresora.component.html',
  styleUrls: [ './edicion-impresora.component.css' ]
})
export class EdicionImpresoraComponent {


  guardarImpresora(f:any){
    console.log(f)
  }

}
