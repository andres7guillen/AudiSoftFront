import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfessorService } from '../../../../core/services/professor.service';
import { CommonModule } from '@angular/common';
import { Professor } from '../../../../core/models/professor.model';

@Component({
  selector: 'app-professor-list.component',
  imports: [CommonModule],
  templateUrl: './professor-list.component.html',
})
export class ProfessorListComponent {
  private service = inject(ProfessorService);
  private router = inject(Router);
  professors: Professor[] = [];
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
        console.log('DATAAAAAA', res);
        this.professors = res.items;
        this.totalCount = res.totalCount;
        this.cdr.detectChanges();
      },
      error: (err) => Swal.fire('Error', err.error, 'error'),
    });
  }

  create() {
    this.router.navigate(['/professors/create']);
  }

  edit(id: string) {
    this.router.navigate(['/professors/edit', id]);
  }

  detail(id: string) {
    this.router.navigate(['/professors/detail', id]);
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Eliminar?',
      icon: 'warning',
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', '', 'success');
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
