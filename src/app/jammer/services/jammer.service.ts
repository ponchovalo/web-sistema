import { Injectable } from '@angular/core';
import { Jammer } from '../interfaces/jammer.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JammerService {

  constructor(private http: HttpClient) { }

  urlBase = 'http://10.222.36.58:9494/'

  getJammer(): Observable<Jammer[]>{
    return this.http.get<Jammer[]>(`${this.urlBase}ConsultarEstadoJammer`);
  }   

}
