import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-libro-list',
  imports: [NgFor],
  templateUrl: './libro-list.component.html',
})
export class LibroListComponent implements OnInit {

  libros: Libro[] = [];

  constructor(private service: LibroService) {}

  ngOnInit(): void {
    console.log(`getlibros`);

    this.getLibros();
  }

  getLibros(): void {
    this.service.getLibros().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.libros = response.data;
          console.log(this.libros);
        }
      },
      error: (error) => {
        console.error(`LibroListComponent-getLibros = ${error}`);
      }
    });
  }
}
