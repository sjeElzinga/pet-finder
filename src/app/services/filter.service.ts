import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Filter {
  gender?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterValues$: Observable<Filter>;
  
  private filterValuesBehaviorSubject = new BehaviorSubject<Filter>({});

  constructor() {
    this.filterValues$ = this.filterValuesBehaviorSubject.asObservable();
  }

  public setFilterValues(values: Filter) {
    this.filterValuesBehaviorSubject.next(values);
  }
}