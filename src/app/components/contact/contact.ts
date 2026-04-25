import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudCitaService } from '../../services/solicitud-cita.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './contact.css'
})
export class Contact {
  private fb = inject(FormBuilder);
  private solicitudService = inject(SolicitudCitaService);
  private router = inject(Router);

  contactForm: FormGroup;
  submitted = false;
  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  services = [
    'Consulta Veterinaria',
    'Adopción',
    'Grooming & Spa',
    'Guardería / Hotel',
    'Tienda',
    'Adiestramiento',
    'Emergencia'
  ];

  contactInfo = [
    { icon: 'bi-geo-alt-fill', label: 'Dirección', value: 'Av. Los Pinos 345, Miraflores, Lima' },
    { icon: 'bi-telephone-fill', label: 'Teléfono', value: '+51 1 234 5678' },
    { icon: 'bi-envelope-fill', label: 'Email', value: 'hola@petnest.pe' },
    { icon: 'bi-clock-fill', label: 'Horario', value: 'Lun - Dom: 7am - 10pm' }
  ];

  constructor() {
    this.contactForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+\s\-()]{9,}$/)]],
      nombreMascota: ['', Validators.required],
      servicio: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.isLoading.set(true);
      const solicitud = this.contactForm.value;

      this.solicitudService.crear(solicitud).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.successMessage.set('¡Tu solicitud de cita ha sido registrada exitosamente! Nos contactaremos pronto.');
          this.contactForm.reset();
          this.submitted = false;
          setTimeout(() => {
            this.successMessage.set('');
          }, 5000);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set('Error al registrar la solicitud. Intenta de nuevo.');
          console.error('Error:', err);
          setTimeout(() => {
            this.errorMessage.set('');
          }, 5000);
        }
      });
    }
  }

  goToCrud() {
    this.router.navigate(['/crud']);
  }
}
