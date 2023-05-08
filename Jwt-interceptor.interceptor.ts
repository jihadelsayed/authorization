import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,

} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { StyleModeService } from '../header/style-mode.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(@Inject(LOCALE_ID) public localeId: string, public styleModeService: StyleModeService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const customReq = request.clone({});
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {

            // auto logout if 401 response returned from api
            localStorage.removeItem('userToken');
            const ho = window.location.hostname
            window.location.replace(
              "http://accounts." + ho.substring(ho.lastIndexOf(".", ho.lastIndexOf(".") - 1) + 1) || 'neetechs.com'
              +':' + '80'
              )
            //this.router.navigate(['/login']);
          }
          //  console.log(error)

          // server error
          return throwError(error)
        } else {
          // client side error
          return throwError(error)

        }
      })
    );
  }
}
