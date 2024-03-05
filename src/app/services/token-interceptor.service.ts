import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authServices = this.inject.get(AuthService);
    let clonedRequest = req.clone({
      setHeaders: {
        token: `Bearer ${authServices.getToken()}`,
      },
    });
    return next.handle(clonedRequest);
  }
}

/**
 * Note
 * clone: nó tạo một bản sao của HttpRequest với header chứa token.
 * handle: để tiếp tục xử lý chuỗi yêu cầu HTTP.
 */
