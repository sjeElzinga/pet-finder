import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PetFinderService } from '../../services/pet-finder.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filters',
  imports: [MatSelectModule, MatInputModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  public displayFilters = false;
  public animalTypes$: Observable<string>;
  public filterForm = new FormGroup({
    gender: new FormControl(),
    type: new FormControl()
  });

 constructor(
    private filterService: FilterService,
    private petFinderService: PetFinderService
  ) {
    this.animalTypes$ = this.petFinderService.getAnimalTypes()
      .pipe(
        map(result => result.types.map((type: any) => type.name))
      );

    this.filterForm.valueChanges
      .pipe(
        map(values =>
          Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== null))
        ),
        takeUntilDestroyed()
      )
      .subscribe(values => this.filterService.setFilterValues(values))
  }

  public onDisplayFiltersToggle(): void {
    this.displayFilters = !this.displayFilters;
  }
}
