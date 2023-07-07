import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarCambioComponent } from '../../components/registrar-cambio/registrar-cambio.component';

@Component({
  selector: 'app-control-toner',
  templateUrl: './control-toner.component.html',
  styleUrls: ['./control-toner.component.css']
})
export class ControlTonerComponent {

  constructor (private dialog: MatDialog){}

  dialogReg(){
    this.dialog.open(RegistrarCambioComponent, {
      width: '700px'
    })
  }

}
