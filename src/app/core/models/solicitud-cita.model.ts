export interface SolicitudCita {
  idSolicitud?: number;
  nombreCompleto: string;
  correo: string;
  telefono: string;
  nombreMascota: string;
  servicio: string;
  mensaje: string;
  estado?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
  fechaEliminacion?: string;
  fechaRestauracion?: string;
}
