import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../../../../core/services/student.service';

@Component({
  selector: 'app-student-list.component',
  imports: [],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  students: any[] = [];

  constructor(
    private service: StudentService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (res) => (this.students = res.items),
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
          error: (err) => Swal.fire('Error', err.error, 'error'),
        });
      }
    });
  }
}
