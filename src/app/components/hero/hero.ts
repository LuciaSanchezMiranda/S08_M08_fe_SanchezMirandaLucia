import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './hero.css'
})
export class Hero {
  stats = [
    { icon: 'bi-heart-fill', value: '1,200+', label: 'Mascotas adoptadas' },
    { icon: 'bi-people-fill', value: '3,500+', label: 'Familias felices' },
    { icon: 'bi-star-fill', value: '4.9', label: 'Calificación promedio' }
  ];
}
