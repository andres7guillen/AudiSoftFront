import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeService } from '../../../../core/services/grade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grade-edit.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grade-edit.component.html',
})
export class GradeEditComponent {
  private fb = inject(FormBuilder);

  form: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private service: GradeService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [''],
      professorId: [''],
      studentId: [''],
      name: [''],
      value: [0],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.service.getById(this.id).subscribe({
      next: (res) => this.form.patchValue(res),
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }

  goBack(): void {
    this.router.navigate(['/grades']);
  }

  save() {
    if (this.form.invalid) return;

    this.service.update(this.form.value).subscribe({
      next: () => {
        Swal.fire('Actualizado', '', 'success');
        this.router.navigate(['/grades']);
      },
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }
}
