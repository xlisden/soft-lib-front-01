import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LibroService} from '../../services/libro.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-libro-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './libro-form.component.html',
  styles: ``
})
export class LibroFormComponent implements OnInit {

  libroForm: FormGroup;
  isEditMode: boolean = false;
  id: number | null = null;
  error: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private service: LibroService, private router: Router, private route: ActivatedRoute) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required, Validators.minLength(3)],
      isbn: ['', Validators.required],
      editorial: ['', Validators.required],
      categoriaId: [1, Validators.required],
      autorId: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: string | number; }) => {
      if (params['id']) {
        this.isEditMode = true;
        this.id = +params['id'];
        this.getById(this.id);
      }
    });
  }

  getById(id: number) {
    this.service.getById(id).subscribe({
      next: (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.libroForm.patchValue(response.data!);
        }
      },
      error: (error: any) => {
        console.error(`LibroFromComponent-getById = ${error}`);
      }
    });
  }

  onSubmit() {
    const libro = this.libroForm.value;
    if (this.isEditMode && this.id) {
      this.service.edit(this.id, libro).subscribe({
        next: (response: any) => {
          if (response.sucess) {
            this.successMessage = "Libro actualizado correctamente";
            setTimeout(() => {
              this.router.navigate(['/libros']);
            }, 1500);
          }
        },
        error: (error: any) => {
          console.error(`LibroFromComponent-onSubmit-if = ${error}`);
        }
      })
    } else {
      this.service.add(libro).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.successMessage = "Libro creado correctamente";
            setTimeout(() => {
              this.router.navigate(['/libros']);
            }, 1500);
          }
        },
        error: (error: any) => {
          console.error(`LibroFromComponent-onSubmit-else = ${error}`);
        }
      });
    }
  }
}
