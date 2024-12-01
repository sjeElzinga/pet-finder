import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Animal {
  id: number;
  name: string;
  gender: string;
  type: string;
  age: string;
  description?: string;
  image?: Image;
  images?: Image[]; 
}

export interface requestParams {
  page: number;
  gender?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PetFinderService {
  private apiUrl = 'https://api.petfinder.com/v2';

  constructor(
    private http: HttpClient
  ) {}

  public getAnimals(params: requestParams): Observable<any> {
    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      httpParams = httpParams.set(key, value);
    }

    return this.http.get(`${this.apiUrl}/animals`, { params: httpParams });
  }

  public getAnimalById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/animals/${id}`);
  }

  public getAnimalTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/types`);
  }
}

interface Image {
  small: string;
  medium: string;
  large: string;
  full: string;
}