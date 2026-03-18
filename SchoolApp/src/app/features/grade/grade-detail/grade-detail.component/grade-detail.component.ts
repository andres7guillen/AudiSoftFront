import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GradeService } from '../../../../core/services/grade.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grade-detail.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grade-detail.component.html',
})
export class GradeDetailComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  gradeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: GradeService,
  ) {
    this.gradeForm = this.fb.group({
      name: [''],
      professorName: [''],
      studentName: [''],
      value: [0],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.service.getById(id).subscribe({
      next: (res) => this.gradeForm.patchValue(res),
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }

  goBack(): void {
    this.router.navigate(['/grades']);
  }
}
