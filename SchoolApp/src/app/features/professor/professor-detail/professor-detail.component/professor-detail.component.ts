import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfessorService } from '../../../../core/services/professor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professor-detail.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './professor-detail.component.html',
})
export class ProfessorDetailComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    id: [''],
    name: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private service: ProfessorService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.service.getById(id).subscribe({
      next: (res) => {
        this.form.patchValue(res);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/professors']);
  }
}
