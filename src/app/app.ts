import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer
  ],
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('PetCare Pro - Adopción de Mascotas');
}
