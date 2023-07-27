import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { TreeTableModule } from 'primeng/treetable';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MenubarModule,
    CardModule,
    ListboxModule,
    TableModule,
    DialogModule,
    FieldsetModule,
    ChartModule,
    TreeTableModule,
    TagModule,
    ToastModule,
    MessagesModule,
    PanelModule,
    RadioButtonModule,
    CalendarModule,
    DynamicDialogModule
  ],
  exports:[
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MenubarModule,
    CardModule,
    ListboxModule,
    TableModule,
    DialogModule,
    FieldsetModule,
    ChartModule,
    TreeTableModule,
    TagModule,
    ToastModule,
    MessagesModule,
    PanelModule,
    RadioButtonModule,
    CalendarModule,
    DynamicDialogModule
  ]
})
export class PrimeNgModule { }
