import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudCitaService, SolicitudCita } from '../../services/solicitud-cita.service';

@Component({
  selector: 'app-crud-solicitudes',
  templateUrl: './crud-solicitudes.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrl: './crud-solicitudes.css'
})
export class CrudSolicitudesComponent implements OnInit {
  private solicitudService = inject(SolicitudCitaService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

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

  // Form
  editForm: FormGroup | null = null;

  // Computed signals
  filteredSolicitudes = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const status = this.selectedStatus();

    return this.solicitudes().filter((s) => {
      const matchesSearch =
        !search ||
        s.nombreMascota.toLowerCase().includes(search) ||
        s.nombreCompleto.toLowerCase().includes(search) ||
        s.correo.toLowerCase().includes(search);

      const matchesStatus = !status || s.estado === status;

      return matchesSearch && matchesStatus;
    });
  });

  ngOnInit(): void {
    this.loadSolicitudes();
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
        this.errorMessage.set('Error al cargar las solicitudes');
        console.error('Error:', err);
      }
    });
  }

  onSearchChange(): void {
    // Reactive computed signal updates automatically
  }

  onStatusChange(): void {
    // Reactive computed signal updates automatically
  }

  openDetails(solicitud: SolicitudCita): void {
    this.selectedSolicitud.set(solicitud);
    this.showDetailsModal.set(true);
  }

  openEditModal(solicitud: SolicitudCita): void {
    this.selectedSolicitud.set(solicitud);
    this.editForm = this.fb.group({
      nombreCompleto: [solicitud.nombreCompleto, [Validators.required, Validators.minLength(3)]],
      correo: [solicitud.correo, [Validators.required, Validators.email]],
      telefono: [solicitud.telefono, [Validators.required]],
      nombreMascota: [solicitud.nombreMascota, [Validators.required, Validators.minLength(2)]],
      servicio: [solicitud.servicio, Validators.required],
      estado: [solicitud.estado || 'Pendiente', Validators.required],
      mensaje: [solicitud.mensaje, [Validators.required, Validators.minLength(10)]]
    });
    this.showEditModal.set(true);
  }

  saveChanges(): void {
    if (!this.editForm || !this.editForm.valid || !this.selectedSolicitud()) {
      return;
    }

    this.isUpdating.set(true);
    const id = this.selectedSolicitud()!.idSolicitud!;
    const updatedData = this.editForm.value;

    this.solicitudService.actualizar(id, updatedData).subscribe({
      next: (response) => {
        this.isUpdating.set(false);
        // Update the local array
        const index = this.solicitudes().findIndex((s) => s.idSolicitud === id);
        if (index !== -1) {
          const updated = [...this.solicitudes()];
          updated[index] = response;
          this.solicitudes.set(updated);
        }
        this.successMessage.set('Solicitud actualizada exitosamente');
        this.closeModals();
        setTimeout(() => this.clearMessages(), 3000);
      },
      error: (err) => {
        this.isUpdating.set(false);
        this.errorMessage.set('Error al actualizar la solicitud');
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
      this.solicitudService.eliminar(solicitud.idSolicitud).subscribe({
        next: () => {
          this.isDeleting.set(false);
          this.loadSolicitudes();
          this.successMessage.set('Solicitud eliminada exitosamente');
          this.closeModals();
          setTimeout(() => this.clearMessages(), 3000);
        },
        error: (err) => {
          this.isDeleting.set(false);
          this.errorMessage.set('Error al eliminar la solicitud');
          console.error('Error:', err);
        }
      });
    } else {
      this.solicitudService.restaurar(solicitud.idSolicitud).subscribe({
        next: () => {
          this.isDeleting.set(false);
          this.loadSolicitudes();
          this.successMessage.set('Solicitud restaurada exitosamente');
          this.closeModals();
          setTimeout(() => this.clearMessages(), 3000);
        },
        error: (err) => {
          this.isDeleting.set(false);
          this.errorMessage.set('Error al restaurar la solicitud');
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
    this.editForm = null;
  }

  clearMessages(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  goToForm(): void {
    this.router.navigate(['/']);
  }
}
