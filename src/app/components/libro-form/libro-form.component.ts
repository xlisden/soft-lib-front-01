import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-libro-form',
  imports: [],
  templateUrl: './libro-form.component.html',
})
export class LibroFormComponent implements OnInit {
  libroForm: FormGroup;
  isEditMode: boolean = false;
  libroid: number | null = null;
  error: string = '';
  sucessMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private service: LibroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      autor: ['', [Validators.required]],
      ibsn: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.libroid = params['id'];
        this.getLibro(this.libroid);
      }
    });
  }

  onSubmit() {
    console.log(`onsubmit`);
  }

  getLibro(id: any) {
    this.service.getLibro(id).subscribe({
      next: (response) => {
        if (response.success && !Array.isArray(response.data)) {
          console.log(`response getlibro libroform =>`);
          console.log(response);

          this.libroForm.patchValue(response.data!);
          console.log(`libroForm libroform =>`);
          console.log(this.libroForm);
        }
      },
      error: (err) => {
        this.error = 'Error al getLibro';
        console.error(err);
      },
    });
  }
}
