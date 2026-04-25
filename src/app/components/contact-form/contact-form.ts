import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolicitudCitaService } from '../../services/solicitud-cita.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './contact-form.css'
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private solicitudService = inject(SolicitudCitaService);
  private router = inject(Router);

  solicitudForm!: FormGroup;
  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.solicitudForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{9,}$/)]],
      nombreMascota: ['', [Validators.required, Validators.minLength(2)]],
      servicio: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.solicitudForm.invalid) {
      this.errorMessage.set('Por favor, completa correctamente todos los campos del formulario.');
      return;
    }

    this.isLoading.set(true);
    const solicitud = this.solicitudForm.value;

    this.solicitudService.crear(solicitud).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.successMessage.set('¡Tu solicitud de cita ha sido registrada exitosamente! Nos contactaremos pronto.');
        this.solicitudForm.reset();
        setTimeout(() => {
          this.clearMessages();
        }, 5000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al registrar la solicitud. Intenta de nuevo más tarde.');
        console.error('Error:', err);
      }
    });
  }

  onReset(): void {
    this.solicitudForm.reset();
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
