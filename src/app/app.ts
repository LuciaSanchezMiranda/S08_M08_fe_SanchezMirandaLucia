import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Courses } from './components/courses/courses';
import { Benefits } from './components/benefits/benefits';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [Header, Hero, Courses, Benefits, Contact, Footer],
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('PetCare Pro - Adopción de Mascotas');
}
