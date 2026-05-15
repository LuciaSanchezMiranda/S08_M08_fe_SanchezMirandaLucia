import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './footer.css'
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerLinks = [
    {
      title: 'Servicios',
      links: [
        { label: 'Clínica Veterinaria', href: '#servicios' },
        { label: 'Adopción Responsable', href: '#adopcion' },
        { label: 'Grooming & Spa', href: '#servicios' },
        { label: 'Guardería & Hotel', href: '#servicios' },
        { label: 'Tienda PetNest', href: '#servicios' }
      ]
    },
    {
      title: 'Nosotros',
      links: [
        { label: 'Sobre PetNest', href: '#' },
        { label: 'Nuestro equipo', href: '#' },
        { label: 'Blog de mascotas', href: '#' },
        { label: 'Casos de éxito', href: '#' },
        { label: 'Trabaja con nosotros', href: '#' }
      ]
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Preguntas frecuentes', href: '#' },
        { label: 'Política de privacidad', href: '#' },
        { label: 'Términos de servicio', href: '#' },
        { label: 'Emergencias 24/7', href: '#contacto' },
        { label: 'Contacto', href: '#contacto' }
      ]
    }
  ];

  socials = [
    { icon: 'bi-instagram', label: 'Instagram', href: '#' },
    { icon: 'bi-facebook', label: 'Facebook', href: '#' },
    { icon: 'bi-tiktok', label: 'TikTok', href: '#' },
    { icon: 'bi-whatsapp', label: 'WhatsApp', href: '#' },
    { icon: 'bi-youtube', label: 'YouTube', href: '#' }
  ];
}
