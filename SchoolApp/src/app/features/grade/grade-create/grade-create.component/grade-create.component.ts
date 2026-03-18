import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { GradeService } from '../../../../core/services/grade.service';
import { CommonModule } from '@angular/common';
import { Professor } from '../../../../core/models/professor.model';
import { Student } from '../../../../core/models/student.model';
import { StudentService } from '../../../../core/services/student.service';
import { ProfessorService } from '../../../../core/services/professor.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grade-create.component.html',
})
export class GradeCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  gradeForm: FormGroup;
  id!: string;
  professors: Professor[] = [];
  students: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: GradeService,
    private studentService: StudentService,
    private professorService: ProfessorService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.gradeForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      professorId: [''],
      studentId: [''],
      value: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    });
  }

  ngOnInit() {
    this.loadProfessors();
    this.loadStudents();
    this.id = this.route.snapshot.params['id'];
  }

  goBack(): void {
    this.router.navigate(['/grades']);
  }

  loadProfessors() {
    this.professorService.getProfessors().subscribe((res) => {
      this.professors = res.items;
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((res) => {
      this.students = res.items;
      this.cdr.detectChanges();
    });
  }

  save() {
    if (this.gradeForm.invalid) return;

    this.service.create(this.gradeForm.value).subscribe({
      next: () => {
        Swal.fire('Created', '', 'success');
        this.router.navigate(['/grades']);
      },
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }
}
