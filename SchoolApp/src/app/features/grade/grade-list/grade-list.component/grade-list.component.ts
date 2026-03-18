import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GradeService } from '../../../../core/services/grade.service';
import { Grade } from '../../../../core/models/grade.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-grade-list',
  imports: [CommonModule],
  templateUrl: './grade-list.component.html',
})
export class GradeListComponent implements OnInit {
  private service = inject(GradeService);
  private router = inject(Router);
  grades: Grade[] = [];
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
        this.grades = res.items;
        this.totalCount = res.totalCount;
        this.cdr.detectChanges();
      },
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }

  create() {
    this.router.navigate(['/grades/create']);
  }

  edit(id: string) {
    this.router.navigate(['/grades/edit', id]);
  }

  detail(id: string) {
    this.router.navigate(['/grades/detail', id]);
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Are you sure you want to remove the grade?',
      icon: 'warning',
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire('Removed', '', 'success');
            if (this.grades.length === 1) {
              if (this.page > 1) {
                this.page--; // retrocede página
              }
            }
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
