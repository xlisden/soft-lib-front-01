import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Libro, LibroResponse} from '../models/libro.interface';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private apiUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) {}

  getAll():Observable<LibroResponse> { // observable: para llamadas asincronas / subscripciones
    return this.http.get<LibroResponse>(`${this.apiUrl}/`);
  }

  getById(id: Number): Observable<LibroResponse> {
    return this.http.get<LibroResponse>(`${this.apiUrl}/{id}`);
  }

  add(libro: Libro): Observable<LibroResponse> {
    return this.http.post<LibroResponse>(`${this.apiUrl}/add`, libro);
  }

  edit(id: number, libro: Libro): Observable<LibroResponse> {
    return this.http.post<LibroResponse>(`${this.apiUrl}/edit/{id}`, libro);
  }

  delete(id: number): Observable<LibroResponse> {
    return this.http.delete<LibroResponse>(`${this.apiUrl}/delete/{id}`);
  }
}
