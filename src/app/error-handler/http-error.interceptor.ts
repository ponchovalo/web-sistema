import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorService } from "./error.service";
import { throwError } from 'rxjs';
import { catchError } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor{

  constructor(private errorService: ErrorService ){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return next.handle(req).pipe(
        catchError(error => {
            let errorMessage = '';
            if (error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Client-side error: ${error.error.message}`;
            } else {
                // backend error
                errorMessage = `Server-side error: ${error.error}`;
            }
            //this.errorService.show(errorMessage);
            return throwError(errorMessage);
        })
        

    )
  }
}