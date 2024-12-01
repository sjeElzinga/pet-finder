import { Component } from '@angular/core';
import { Animal, PetFinderService } from '../../services/pet-finder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-animal-details',
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './animal-details.component.html',
  styleUrl: './animal-details.component.css'
})
export class AnimalDetailsComponent {
  public animal$: Observable<Animal | null>;
  public isLoading = true;
  public errorOccured = false;

  constructor(
    private petFinderService: PetFinderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.animal$ = this.route.params
      .pipe(
        switchMap(params => {
          const animalId = Number(params['id']);
          this.isLoading = true;
          this.errorOccured = false;

          return this.petFinderService.getAnimalById(animalId)
            .pipe(
              map(({animal}) => this.parseAnimal(animal)),
              catchError(() => {
                this.errorOccured = true;
                return of(null);
              }),
              finalize(() => (this.isLoading = false))
            )
        })
      );
  }

  public onGoBackToOverview(): void {
    this.router.navigate(['/']);
  }

  
  private parseAnimal(animal: any): Animal {
    const {id, name, type, gender, age, description, photos} = animal;
    return {
      id,
      name,
      gender,
      type,
      age,
      description,
      images:photos.map((photo: any) => photo.large)
    }
  }
}
