import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GradeService } from '../../../../core/services/grade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grade-detail.component',
  imports: [],
  templateUrl: './grade-detail.component.html',
})
export class GradeDetailComponent {
  private fb = inject(FormBuilder);
  gradeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: GradeService,
  ) {
    this.gradeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.service.getById(id).subscribe({
      next: (res) => this.gradeForm.patchValue(res),
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }
}
