import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './header.css'
})
export class Header {
  isScrolled = false;
  menuOpen = false;

  navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'Adopción', href: '#adopcion' },
    { label: 'Contacto', href: '#contacto' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
