import { Component, OnInit } from '@angular/core';
import { JammerService } from '../../services/jammer.service';
import { Jammer } from '../../interfaces/jammer.interface';

@Component({
  selector: 'app-inventario-jammer',
  templateUrl: './inventario-jammer.component.html',
  styleUrls: ['./inventario-jammer.component.css']
})
export class InventarioJammerComponent implements OnInit {

  constructor(private jammerService: JammerService){}

  jammers: Jammer[] = [];

  ngOnInit(): void {
    this.listarJammer();
  }


  listarJammer(){
    this.jammerService.getJammer().subscribe(res => {
      this.jammers = res;
      console.log(this.jammers)
    })
  }

}
