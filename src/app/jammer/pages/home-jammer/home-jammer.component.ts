import { Component, OnInit } from '@angular/core';
import { JammerService } from '../../services/jammer.service';
import { Jammer } from '../../interfaces/jammer.interface';

@Component({
  selector: 'app-home-jammer',
  templateUrl: './home-jammer.component.html',
  styleUrls: ['./home-jammer.component.css']
})
export class HomeJammerComponent {
  seccion: string = 'Jammer';


}
