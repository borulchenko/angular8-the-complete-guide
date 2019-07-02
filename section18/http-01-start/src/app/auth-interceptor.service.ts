import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('request is on its way');
    console.log(req.url);

    const updReq = req.clone({
      headers: req.headers.append('auth', 'basic')
    });

    return next.handle(updReq).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log('response arrived');
      }
    }));
  }
}
