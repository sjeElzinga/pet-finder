import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

export const AuthInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authenticationService = inject(AuthenticationService);

  if (request.url.includes('/oauth2/token')) {
    return next(request);
  } 

  return authenticationService.ensureToken()
  .pipe(
    switchMap(token => {
      if (token) {
        const authenticationRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(authenticationRequest);
      }

      return next(request);
    })
  );
};