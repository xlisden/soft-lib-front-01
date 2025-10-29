import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibroResponse } from '../models/libro.interface';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private apiUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) {}

  getLibros():Observable<LibroResponse> { // para llamadas asincronas / subscripciones
    return this.http.get<LibroResponse>(`${this.apiUrl}/`);
  }
}
