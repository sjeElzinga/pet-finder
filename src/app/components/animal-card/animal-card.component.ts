import { Component, input } from '@angular/core';
import { Animal } from '../../services/pet-finder.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-animal-card',
  imports: [MatCardModule],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css'
})
export class AnimalCardComponent {
 public animal = input<Animal>();
}
