import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  show(error: string){
    console.log(error)
  }

  errorValidaciones(errores: object){
    for(const [key, value] of Object.entries(errores)){
      console.log(value)
    }
  }
}
