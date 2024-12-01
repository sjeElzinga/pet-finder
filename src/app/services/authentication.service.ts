import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { apiKey, apiSecret } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
  private accessToken$ = new BehaviorSubject<string | null>(null);
  private isRequestingToken$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) {}

  public ensureToken(): Observable<string | null> {
    if (this.accessToken$.value) {
      return of(this.accessToken$.value);
    }

    if (this.isRequestingToken$.value) {
      return this.accessToken$.asObservable();
    }

    this.isRequestingToken$.next(true);
    return this.authenticate();
  }


  private authenticate(): Observable<string | null> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', apiKey);
    body.set('client_secret', apiSecret);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<PetFinderAuthentication>(this.tokenUrl, body.toString(), { headers })
      .pipe(
        map(response => {
          const token = response.access_token;
          this.accessToken$.next(token);
          this.isRequestingToken$.next(false);

          return token;
        }),
        catchError((error) => {
          this.isRequestingToken$.next(false);
          console.error('Authentication failed', error);
          return of(null);
        })
      );
  }
}

interface PetFinderAuthentication {
  token_type: string;
  expires_in: number;
  access_token: string;
}