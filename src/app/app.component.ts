import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Animal, PetFinderService } from './services/pet-finder.service';
import { Observable,Subject,combineLatest,map, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from "./components/filters/filters.component";
import { FilterService } from './services/filter.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AnimalCardComponent } from "./components/animal-card/animal-card.component";

// TODO
// - add loading trigger
// - replace any with type

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // providers: [PetFinderService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // public animals$: Observable<Animal[]>;
  // public pagination$: Observable<Pagination>;

  // private currentPageNumber$ = new Subject()
  
  // constructor(
  //   private petFinderService: PetFinderService,
  //   private filterService: FilterService,
  //   private router: Router
  // ) {

  //   const animalsAndPagination$ =  combineLatest([
  //     this.filterService.filterValues$,
  //     this.currentPageNumber$.pipe(startWith(1))
  //   ])
  //     .pipe(
  //       switchMap(([filterValues, pageNumber]) => {
  //         console.log(pageNumber)
  //         if (filterValues) {
  //           return this.petFinderService.getAnimals({...filterValues, page: pageNumber})
  //             .pipe(
  //               map(response => ({
  //                 animals: response.animals.map((animal: any) => ({
  //                   ...animal,
  //                   image: animal.photos?.[1]?.medium,
  //                 })),
  //                 pagination: response.pagination,
  //               }))
  //             );
  //         } else {
  //           return of({ animals: [], pagination: null });
  //         }
  //       }),
  //       shareReplay(1) // Share the same stream for multiple subscriptions
  //     )

  //   this.animals$ = animalsAndPagination$.pipe(map(data => data.animals));
  //   this.pagination$ = animalsAndPagination$.pipe(map(data => data.pagination.total_pages));

  //   // this.animals$ = of([])
  // }

  // public onPageChange(event: PageEvent): void {
  //   console.log(event)
  //   this.currentPageNumber$.next(event.pageIndex + 1);
  // }

  // public onViewAnimalDetails(id: number): void {
  //   console.log(id)
  //   this.router.navigate(['/animal', id]);
  // }
}