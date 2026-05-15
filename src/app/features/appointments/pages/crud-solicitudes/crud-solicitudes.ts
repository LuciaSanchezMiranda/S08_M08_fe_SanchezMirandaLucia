import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudCitaService } from '../../../../core/services/solicitud-cita.service';
import { SolicitudCita } from '../../../../core/models/solicitud-cita.model';

@Component({
  selector: 'app-crud-solicitudes',
  templateUrl: './crud-solicitudes.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrl: './crud-solicitudes.css'
})
export class CrudSolicitudesComponent implements OnInit {

  private solicitudService = inject(SolicitudCitaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Signals
  solicitudes = signal<SolicitudCita[]>([]);
  isLoading = signal(false);
  isUpdating = signal(false);
  isDeleting = signal(false);

  searchTerm = signal('');
  selectedStatus = signal('');

  successMessage = signal('');
  errorMessage = signal('');

  // Modals
  showDetailsModal = signal(false);
  showEditModal = signal(false);
  showConfirmModal = signal(false);

  selectedSolicitud = signal<SolicitudCita | null>(null);

  confirmAction = signal<'delete' | 'restore'>('delete');

  // Edit Form (Reactive)
  editForm!: FormGroup;

  // Computed
  filteredSolicitudes = computed(() => {

    const search = this.searchTerm().toLowerCase();
    const status = this.selectedStatus();

    return this.solicitudes().filter((s) => {

      const matchesSearch =
        !search ||
        s.nombreMascota.toLowerCase().includes(search) ||
        s.nombreCompleto.toLowerCase().includes(search) ||
        s.correo.toLowerCase().includes(search);

      const matchesStatus =
        !status ||
        s.estado === status;

      return matchesSearch && matchesStatus;

    });

  });

  ngOnInit(): void {
    this.loadSolicitudes();
    this.initEditForm();
  }

  private initEditForm(): void {
    this.editForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      nombreMascota: ['', [Validators.required, Validators.minLength(2)]],
      servicio: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      estado: ['Pendiente', [Validators.required]]
    });
  }

  private loadSolicitudes(): void {

    this.isLoading.set(true);

    this.solicitudService.listarTodos().subscribe({

      next: (data) => {

        this.solicitudes.set(data);

        this.isLoading.set(false);

      },

      error: (err) => {

        this.isLoading.set(false);

        this.errorMessage.set(
          'Error al cargar las solicitudes'
        );

        console.error('Error:', err);

      }

    });

  }

  onSearchChange(): void {
    // Signals update automatically
  }

  onStatusChange(): void {
    // Signals update automatically
  }

  openDetails(solicitud: SolicitudCita): void {

    this.selectedSolicitud.set(solicitud);

    this.showDetailsModal.set(true);

  }

  openEditModal(solicitud: SolicitudCita): void {

    this.selectedSolicitud.set(solicitud);

    // Patch values to the reactive form
    this.editForm.patchValue({
      nombreCompleto: solicitud.nombreCompleto,
      correo: solicitud.correo,
      telefono: solicitud.telefono,
      nombreMascota: solicitud.nombreMascota,
      servicio: solicitud.servicio,
      mensaje: solicitud.mensaje,
      estado: solicitud.estado
    });

    this.showEditModal.set(true);

  }

  saveChanges(): void {

    if (this.editForm.invalid || !this.selectedSolicitud()) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isUpdating.set(true);

    const id = this.selectedSolicitud()!.idSolicitud!;

    const updatedData = {
      ...this.selectedSolicitud(),
      ...this.editForm.value
    };

    this.solicitudService.actualizar(id, updatedData).subscribe({

      next: (response) => {

        this.isUpdating.set(false);

        // Update local array
        const index = this.solicitudes().findIndex(
          (s) => s.idSolicitud === id
        );

        if (index !== -1) {

          const updated = [...this.solicitudes()];

          updated[index] = response;

          this.solicitudes.set(updated);

        }

        this.successMessage.set(
          'Solicitud actualizada exitosamente'
        );

        this.closeModals();

        setTimeout(() => {
          this.clearMessages();
        }, 3000);

      },

      error: (err) => {

        this.isUpdating.set(false);

        this.errorMessage.set(
          'Error al actualizar la solicitud'
        );

        console.error('Error:', err);

      }

    });

  }

  confirmDelete(solicitud: SolicitudCita): void {

    this.selectedSolicitud.set(solicitud);

    this.confirmAction.set('delete');

    this.showConfirmModal.set(true);

  }

  confirmRestore(solicitud: SolicitudCita): void {

    this.selectedSolicitud.set(solicitud);

    this.confirmAction.set('restore');

    this.showConfirmModal.set(true);

  }

  executeConfirmAction(): void {

    const solicitud = this.selectedSolicitud();

    if (!solicitud || !solicitud.idSolicitud) {
      return;
    }

    this.isDeleting.set(true);

    if (this.confirmAction() === 'delete') {

      this.solicitudService.eliminar(
        solicitud.idSolicitud
      ).subscribe({

        next: () => {

          this.isDeleting.set(false);

          this.loadSolicitudes();

          this.successMessage.set(
            'Solicitud eliminada exitosamente'
          );

          this.closeModals();

          setTimeout(() => {
            this.clearMessages();
          }, 3000);

        },

        error: (err) => {

          this.isDeleting.set(false);

          this.errorMessage.set(
            'Error al eliminar la solicitud'
          );

          console.error('Error:', err);

        }

      });

    } else {

      this.solicitudService.restaurar(
        solicitud.idSolicitud
      ).subscribe({

        next: () => {

          this.isDeleting.set(false);

          this.loadSolicitudes();

          this.successMessage.set(
            'Solicitud restaurada exitosamente'
          );

          this.closeModals();

          setTimeout(() => {
            this.clearMessages();
          }, 3000);

        },

        error: (err) => {

          this.isDeleting.set(false);

          this.errorMessage.set(
            'Error al restaurar la solicitud'
          );

          console.error('Error:', err);

        }

      });

    }

  }

  closeModals(): void {

    this.showDetailsModal.set(false);

    this.showEditModal.set(false);

    this.showConfirmModal.set(false);

    this.selectedSolicitud.set(null);

  }

  clearMessages(): void {

    this.successMessage.set('');

    this.errorMessage.set('');

  }

  // Helper method to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const field = this.editForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  goToForm(): void {

    this.router.navigate(['/']);

  }

}