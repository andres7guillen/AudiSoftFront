import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfessorService } from '../../../../core/services/professor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professor-create.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './professor-create.component.html',
})
export class ProfessorCreateComponent {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private service: ProfessorService,
    private router: Router,
  ) {}

  save() {
    if (this.form.invalid) return;

    this.service.create(this.form.value).subscribe({
      next: () => {
        Swal.fire('Creado', '', 'success');
        this.router.navigate(['/professors']);
      },
    });
  }
}
