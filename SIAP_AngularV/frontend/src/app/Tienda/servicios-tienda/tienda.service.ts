import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TiendaModel } from './tienda.model';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  BASE_URL = "http://localhost:4014";

  constructor(private http: HttpClient) { }

  obtenerTienda(): Observable<TiendaModel[]> {
    return this.http.get<TiendaModel[]>(`${this.BASE_URL}/tienda`)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerTiendaPorId(id: string): Observable<TiendaModel[]> {
    return this.http.get<TiendaModel[]>(`${this.BASE_URL}/tiendaID/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  agregarTienda(tienda: TiendaModel): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/tiendaAG`, tienda)
      .pipe(
        catchError(this.handleError)
      );
  }

  actualizarTienda(tienda: TiendaModel): Observable<any> {
    const id = tienda.idTienda; // Ajustar según el nombre del campo de ID en tu modelo TiendaModel
    return this.http.put<any>(`${this.BASE_URL}/tiendaAc/${id}`, tienda)
      .pipe(
        catchError(this.handleError)
      );
  }

  borrarTienda(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/tiendaEl/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      console.error('Error del lado del servidor:', error.status, error.message);
    }
    return of([]);
  }
}
