import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../core/models/student.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list.component',
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  private service = inject(StudentService);
  private router = inject(Router);
  students: Student[] = [];
  page = 1;
  pageSize = 5;
  totalCount = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.load();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.load();
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
    this.load();
  }

  load() {
    this.service.getAll(this.page, this.pageSize).subscribe({
      next: (res) => {
        console.log('DATAAAA', res);
        this.students = res.items;
        this.totalCount = res.totalCount;
        this.cdr.detectChanges();
      },
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }

  create() {
    this.router.navigate(['/students/create']);
  }

  edit(id: string) {
    this.router.navigate(['/students/edit', id]);
  }

  detail(id: string) {
    this.router.navigate(['/students/detail', id]);
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure you want to remove the student?',
      icon: 'warning',
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire('Removed', '', 'success');
            this.load();
          },
        });
      }
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
