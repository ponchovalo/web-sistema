import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: [ './menu-bar.component.css'
  ]
})
export class MenuBarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  onMenuToggle(){
    this.menuToggle.emit();
  }

}
