import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: [ './menu-bar.component.css'
  ]
})
export class MenuBarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  items: MenuItem[] = [
    {
      label: 'IMPRESION',
      routerLink: '/impresion'
    },
    {
      label: 'WYSE',
      routerLink: '/wyse'
    },
    {
      label: 'TELEVISITAS',
      routerLink: '/televisitas'
    },
    {
      label: 'JAMMER',
      routerLink: '/jammer'
    }
  ]

  onMenuToggle(){
    this.menuToggle.emit();
  }






}
