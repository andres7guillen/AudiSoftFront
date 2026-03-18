import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../../../../core/services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-detail.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [''],
    name: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.service.getById(id).subscribe({
      next: (res) => this.form.patchValue(res),
    });
  }
}
