import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudCitaService, SolicitudCita } from '../../services/solicitud-cita.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactFormComponent {

  private solicitudService = inject(SolicitudCitaService);
  private router = inject(Router);

  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  solicitud: SolicitudCita = {
    nombreCompleto: '',
    correo: '',
    telefono: '',
    nombreMascota: '',
    servicio: '',
    mensaje: ''
  };

  onSubmit(form: any): void {

    if (form.invalid) {
      this.errorMessage.set('Por favor, completa correctamente todos los campos.');
      return;
    }

    this.isLoading.set(true);

    this.solicitudService.crear(this.solicitud).subscribe({
      next: () => {
        this.isLoading.set(false);

        this.successMessage.set(
          '¡Tu solicitud fue registrada exitosamente!'
        );

        form.resetForm();

        setTimeout(() => {
          this.clearMessages();
        }, 5000);
      },

      error: (err) => {
        this.isLoading.set(false);

        this.errorMessage.set(
          'Error al registrar la solicitud.'
        );

        console.error(err);
      }
    });
  }

  onReset(form: any): void {
    form.resetForm();
    this.clearMessages();
  }

  clearMessages(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  goToCrudPanel(): void {
    this.router.navigate(['/crud']);
  }
}