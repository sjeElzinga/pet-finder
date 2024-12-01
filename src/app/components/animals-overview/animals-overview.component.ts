import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { BehaviorSubject, catchError, combineLatest, finalize, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { Animal, PetFinderService } from '../../services/pet-finder.service';
import { FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-animals-overview',
  imports: [CommonModule, FiltersComponent, MatPaginatorModule, AnimalCardComponent, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './animals-overview.component.html',
  styleUrl: './animals-overview.component.css'
})
export class AnimalsOverviewComponent {
  public animals$: Observable<Animal[]>;
  public totalPages$: Observable<number>;
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public error$ = new BehaviorSubject<string | null>(null); 

  private currentPageNumber$ = new BehaviorSubject<number>(1);
  
  constructor(
    private petFinderService: PetFinderService,
    private filterService: FilterService,
    private router: Router
  ) {
    const animalsAndPagination$ =  combineLatest([
      this.filterService.filterValues$,
      this.currentPageNumber$
    ])
      .pipe(
        tap(() => {
          this.isLoading$.next(true);
          this.error$.next(null);
        }),
        switchMap(([filterValues, pageNumber]) => {
          return this.petFinderService.getAnimals({...filterValues, page: pageNumber})
            .pipe(
              map(response => ({
                animals: response.animals.map((animal: any) => this.parseAnimal(animal)),
                totalPages: response.pagination.total_pages,
              })),
              catchError(() => {
                this.error$.next('Failed to load animals. Please try again.');
                return of({ animals: [], totalPages: null });
              }),
              finalize(() => this.isLoading$.next(false)) 
            );
        }),
        shareReplay(1)
      )

    this.animals$ = animalsAndPagination$.pipe(map(data => data.animals));
    this.totalPages$ = animalsAndPagination$.pipe(map(data => data.totalPages));
  }

  public onPageChange(event: PageEvent): void {
    this.currentPageNumber$.next(event.pageIndex + 1);
  }

  public onViewAnimalDetails(id: number): void {
    this.router.navigate(['/animal', id]);
  }

  public onRetryGetAnimals(): void {
    this.currentPageNumber$.next(this.currentPageNumber$.getValue());
  }


  private parseAnimal(animal: any): Animal {
    const {id, name, type, gender, age, photos} = animal;
    return {
      id,
      name,
      gender,
      type,
      age,
      image: photos?.[0]?.medium ?? 'assets/no_image_placeholder.png'
    }
  }
}
