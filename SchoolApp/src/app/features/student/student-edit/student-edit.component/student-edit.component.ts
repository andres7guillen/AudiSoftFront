import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../../../../core/services/student.service';

@Component({
  selector: 'app-student-edit.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
})
export class StudentEditComponent {
  private fb = inject(FormBuilder);

  form: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.service.getById(this.id).subscribe({
      next: (res) => this.form.patchValue(res),
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }

  save() {
    if (this.form.invalid) return;

    this.service.update(this.form.value).subscribe({
      next: () => {
        Swal.fire('Actualizado', '', 'success');
        this.router.navigate(['/students']);
      },
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }
}
