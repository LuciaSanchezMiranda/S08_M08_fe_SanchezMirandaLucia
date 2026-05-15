import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudCitaService } from '../../../../core/services/solicitud-cita.service';
import { SolicitudCita } from '../../../../core/models/solicitud-cita.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactFormComponent implements OnInit {

  private solicitudService = inject(SolicitudCitaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  solicitudForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.solicitudForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      nombreMascota: ['', [Validators.required, Validators.minLength(2)]],
      servicio: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {

    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
      this.errorMessage.set('Por favor, completa correctamente todos los campos.');
      return;
    }

    this.isLoading.set(true);

    const solicitudData: SolicitudCita = this.solicitudForm.value;

    this.solicitudService.crear(solicitudData).subscribe({
      next: () => {
        this.isLoading.set(false);

        this.successMessage.set(
          '¡Tu solicitud fue registrada exitosamente!'
        );

        this.solicitudForm.reset();

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

  onReset(): void {
    this.solicitudForm.reset();
    this.clearMessages();
  }

  clearMessages(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  // Helper method to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const field = this.solicitudForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  goToCrudPanel(): void {
    this.router.navigate(['/crud']);
  }
}