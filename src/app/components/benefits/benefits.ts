import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './benefits.css'
})
export class Benefits {
  benefits = [
    {
      icon: 'bi-shield-check',
      title: 'Veterinarios certificados',
      description: 'Nuestro equipo médico cuenta con certificaciones nacionales e internacionales y más de 10 años de experiencia.'
    },
    {
      icon: 'bi-clock-history',
      title: 'Atención 24/7',
      description: 'Las emergencias no esperan. Estamos disponibles las 24 horas del día, los 7 días de la semana para tu mascota.'
    },
    {
      icon: 'bi-camera-video',
      title: 'Monitoreo en tiempo real',
      description: 'Accede a cámaras en vivo cuando tu mascota esté en guardería o durante su recuperación postoperatoria.'
    },
    {
      icon: 'bi-geo-alt',
      title: 'Servicio a domicilio',
      description: 'Visitas veterinarias, adiestramiento y grooming en la comodidad de tu hogar. Sin estrés para tu mascota.'
    },
    {
      icon: 'bi-journal-medical',
      title: 'Historial digital',
      description: 'Accede al historial médico completo de tu mascota desde nuestra app. Vacunas, tratamientos y más al alcance.'
    },
    {
      icon: 'bi-gift',
      title: 'Programa de puntos',
      description: 'Acumula puntos con cada visita y canjéalos por descuentos, productos gratuitos y servicios especiales.'
    }
  ];

  testimonials = [
    {
      name: 'María García',
      pet: 'Dueña de Toto y Luna',
      text: 'El mejor lugar para nuestras mascotas. Los veterinarios son increíblemente atentos y el servicio de guardería nos da total tranquilidad.',
      rating: 5
    },
    {
      name: 'Carlos Mendoza',
      pet: 'Padre de Max',
      text: 'Adopté a Max con la ayuda de PetNest y todo el proceso fue transparente y amoroso. Lo recomiendo sin dudarlo.',
      rating: 5
    },
    {
      name: 'Ana López',
      pet: 'Dueña de Mia',
      text: 'El servicio de grooming es espectacular. Mia siempre sale hermosa y feliz. Los precios son justos y el personal muy amable.',
      rating: 5
    }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
