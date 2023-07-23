import { Component, OnInit } from '@angular/core';
import { JammerService } from '../../services/jammer.service';

@Component({
  selector: 'app-inventario-jammer',
  templateUrl: './inventario-jammer.component.html',
  styleUrls: ['./inventario-jammer.component.css']
})
export class InventarioJammerComponent implements OnInit {

  constructor(private jammerService: JammerService){}



  ngOnInit(): void {

  }



}
