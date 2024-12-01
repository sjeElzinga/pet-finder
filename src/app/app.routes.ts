import { Routes } from '@angular/router';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalsOverviewComponent } from './components/animals-overview/animals-overview.component';

export const routes: Routes = [
  { 
    path: '', component: 
    AnimalsOverviewComponent 
  },
  {
    path: 'animal/:id', 
    component: AnimalDetailsComponent
  }
];
