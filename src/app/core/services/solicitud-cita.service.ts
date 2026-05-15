import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudCita } from '../models/solicitud-cita.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudCitaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/solicitudes';

  listar(): Observable<SolicitudCita[]> {
    return this.http.get<SolicitudCita[]>(this.apiUrl);
  }

  listarTodos(): Observable<SolicitudCita[]> {
    return this.http.get<SolicitudCita[]>(`${this.apiUrl}`);
  }

  obtenerPorId(id: number): Observable<SolicitudCita> {
    return this.http.get<SolicitudCita>(`${this.apiUrl}/${id}`);
  }

  listarPorEstado(estado: string): Observable<SolicitudCita[]> {
    return this.http.get<SolicitudCita[]>(`${this.apiUrl}/estado/${estado}`);
  }

  crear(solicitud: SolicitudCita): Observable<SolicitudCita> {
    return this.http.post<SolicitudCita>(this.apiUrl, solicitud);
  }

  actualizar(id: number, solicitud: SolicitudCita): Observable<SolicitudCita> {
    return this.http.put<SolicitudCita>(`${this.apiUrl}/${id}`, solicitud);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  restaurar(id: number): Observable<SolicitudCita> {
    return this.http.put<SolicitudCita>(`${this.apiUrl}/${id}/restaurar`, {});
  }
}
