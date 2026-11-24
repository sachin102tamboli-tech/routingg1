import { inject, Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  private _spinnerService = inject(SpinnerService)
  constructor() { }

  AuthInterceptorService(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
    this._spinnerService.show()
    let token = localStorage.getItem('token')
    if(token) {
      req = req.clone({
        setHeaders : {
          auth : 'Token...'
        }
      })
    }
    return next.handle(req)
    .pipe(
      finalize(() => {
        this._spinnerService.hide()
      })
    )
  }
}
