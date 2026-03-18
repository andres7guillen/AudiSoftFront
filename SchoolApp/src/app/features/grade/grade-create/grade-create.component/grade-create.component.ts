import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { GradeService } from '../../../../core/services/grade.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grade-create.component.html',
})
export class GradeCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  gradeForm: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private service: GradeService,
    private router: Router,
  ) {
    this.gradeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.service.getById(this.id).subscribe({
      next: (res) => this.gradeForm.patchValue(res),
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }

  save() {
    if (this.gradeForm.invalid) return;

    this.service.update(this.gradeForm.value).subscribe({
      next: () => {
        Swal.fire('Actualizado', '', 'success');
        this.router.navigate(['/grades']);
      },
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }
}
