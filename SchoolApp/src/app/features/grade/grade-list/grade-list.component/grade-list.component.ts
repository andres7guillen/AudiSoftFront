import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GradeService } from '../../../../core/services/grade.service';

@Component({
  standalone: true,
  selector: 'app-grade-list',
  template: `
    <h2>Grades</h2>

    <button (click)="create()">Crear</button>

    <ul>
      <li *ngFor="let g of grades">
        {{ g.name }}

        <button (click)="detail(g.id)">Ver</button>
        <button (click)="edit(g.id)">Editar</button>
        <button (click)="delete(g.id)">Eliminar</button>
      </li>
    </ul>
  `,
})
export class GradeListComponent implements OnInit {
  grades: any[] = [];

  constructor(
    private service: GradeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (res) => (this.grades = res.items),
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
