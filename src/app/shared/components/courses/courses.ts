import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  featured?: boolean;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './courses.css'
})
export class Courses {
  services: Service[] = [
    {
      icon: 'bi-hospital',
      category: 'Salud',
      title: 'Clínica Veterinaria',
      description: 'Atención médica completa con veterinarios especializados. Diagnóstico, cirugía, emergencias y seguimiento personalizado.',
      features: ['Consultas y diagnóstico', 'Cirugías y procedimientos', 'Urgencias 24 horas', 'Laboratorio clínico'],
      color: '#edf7e4',
      featured: true
    },
    {
      icon: 'bi-heart',
      category: 'Adopción',
      title: 'Adopción Responsable',
      description: 'Conectamos animales rescatados con familias amorosas. Proceso de adopción acompañado y transparente.',
      features: ['Perros y gatos en adopción', 'Evaluación del hogar', 'Seguimiento post-adopción', 'Charlas de orientación'],
      color: '#fef0e6',
      featured: false
    },
    {
      icon: 'bi-scissors',
      category: 'Estética',
      title: 'Grooming & Spa',
      description: 'Servicio completo de estética canina y felina. Tu mascota siempre radiante con nuestros groommers expertos.',
      features: ['Baño y secado', 'Corte de pelo', 'Limpieza dental', 'Corte de uñas'],
      color: '#f0f0ff',
      featured: false
    },
    {
      icon: 'bi-house-heart',
      category: 'Hospedaje',
      title: 'Guardería & Hotel',
      description: 'Un hogar lejos del hogar para tu mascota. Atención personalizada, juego y descanso en un ambiente seguro.',
      features: ['Habitaciones privadas', 'Paseos diarios', 'Alimentación incluida', 'Cámaras en tiempo real'],
      color: '#fff5e6',
      featured: false
    },
    {
      icon: 'bi-bag-heart',
      category: 'Tienda',
      title: 'Tienda PetNest',
      description: 'Todo lo que tu mascota necesita en un solo lugar. Alimentos premium, accesorios, ropa y juguetes.',
      features: ['Alimentos premium', 'Accesorios y collares', 'Juguetes y camas', 'Suplementos vitamínicos'],
      color: '#e6f5f5',
      featured: false
    },
    {
      icon: 'bi-mortarboard',
      category: 'Entrenamiento',
      title: 'Adiestramiento',
      description: 'Entrenadores certificados que usan técnicas positivas para formar mascotas obedientes y felices.',
      features: ['Obediencia básica', 'Corrección de conductas', 'Socialización', 'Sesiones a domicilio'],
      color: '#fce8f3',
      featured: false
    }
  ];
}
