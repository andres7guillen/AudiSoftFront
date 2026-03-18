import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { CreateStudent } from '../../../../core/models/student.model';

@Component({
  standalone: true,
  selector: 'app-student-create',
  imports: [ReactiveFormsModule],
  templateUrl: './student-create.component.html',
})
export class StudentCreateComponent {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private service: StudentService,
    private router: Router,
  ) {}

  save() {
    if (this.form.invalid) return;

    const data: CreateStudent = this.form.value;

    this.service.create(data).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}
