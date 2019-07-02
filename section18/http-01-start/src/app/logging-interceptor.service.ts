import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    console.log('Outgoung req');
    console.log(req.headers);

    return next.handle(this.getReq(req))
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log('Incoming req');
            console.log(event);
          }
        })
      )
      ;
  }

  private getReq(req: HttpRequest<any>) {
    if (req.headers.get('auth') !== 'basic') {
      return req.clone({
        url: '/'
      });
    }

    return req;
  }
}
