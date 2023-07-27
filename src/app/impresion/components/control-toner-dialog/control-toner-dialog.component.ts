import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogInjector } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-control-toner-dialog',
  templateUrl: './control-toner-dialog.component.html',
  styleUrls: ['./control-toner-dialog.component.css']
})
export class ControlTonerDialogComponent implements OnInit {

  ref: DynamicDialogInjector | undefined;

  constructor(private dialogService: DialogService ){}

  

  ngOnInit(): void {
    console.log(this.ref?.get("paginacionReq"))
  }

  




}
