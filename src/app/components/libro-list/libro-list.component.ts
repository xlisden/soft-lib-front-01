import {Component, OnInit} from '@angular/core';
import {LibroService} from '../../services/libro.service';
import {Libro} from '../../models/libro.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-libro-list',
  imports: [
    RouterLink
  ],
  templateUrl: './libro-list.component.html',
})
export class LibroListComponent implements OnInit {

  libros: Libro[] = [];
  libro!: Libro;
  error: string = '';

  constructor(private service: LibroService) {
  }

  ngOnInit(): void {
    console.log(`getlibros`);

    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe({
      next: (response: { success: any; data: Libro[]; }) => {
        if (response.success && Array.isArray(response.data)) {
          this.libros = response.data;
          console.log(this.libros);
        }
      },
      error: (error: any) => {
        console.error(`LibroListComponent-getAll = ${error}`);
      }
    });
  }

  delete(id: number): void {
    if (confirm('Seguro de eliminar el libro?')) {
      this.service.delete(id).subscribe({
        next: (response: { success: any; }) => {
          if (response.success) {
            this.getAll();
          }
        },
        error: (error: any) => {
          console.error(`LibroListComponent-delete = ${error}`);
        }
      })
    }
  }
}
