import { Routes } from '@angular/router';

const loadProfessorListComponent = () =>
  import('./features/professor/professor-list/professor-list.component/professor-list.component').then(
    (m) => m.ProfessorListComponent,
  );

const loadProfessorCreateComponent = () =>
  import('./features/professor/professor-create/professor-create.component/professor-create.component').then(
    (m) => m.ProfessorCreateComponent,
  );

const loadProfessorEditComponent = () =>
  import('./features/professor/professor-edit/professor-edit.component/professor-edit.component').then(
    (m) => m.ProfessorEditComponent,
  );

const loadProfessorDetailComponent = () =>
  import('./features/professor/professor-detail/professor-detail.component/professor-detail.component').then(
    (m) => m.ProfessorDetailComponent,
  );

const loadStudentListComponent = () =>
  import('./features/student/student-list/student-list.component/student-list.component').then(
    (m) => m.StudentListComponent,
  );

const loadStudentCreateComponent = () =>
  import('./features/student/student-create/student-create.component/student-create.component').then(
    (m) => m.StudentCreateComponent,
  );

const loadStudentEditComponent = () =>
  import('./features/student/student-edit/student-edit.component/student-edit.component').then(
    (m) => m.StudentEditComponent,
  );

const loadStudentDetailComponent = () =>
  import('./features/student/student-detail/student-detail.component/student-detail.component').then(
    (m) => m.StudentDetailComponent,
  );

const loadGradeListComponent = () =>
  import('./features/grade/grade-list/grade-list.component/grade-list.component').then(
    (m) => m.GradeListComponent,
  );

const loadGradeCreateComponent = () =>
  import('./features/grade/grade-create/grade-create.component/grade-create.component').then(
    (m) => m.GradeCreateComponent,
  );

const loadGradeEditComponent = () =>
  import('./features/grade/grade-edit/grade-edit.component/grade-edit.component').then(
    (m) => m.GradeEditComponent,
  );

const loadGradeDetailComponent = () =>
  import('./features/grade/grade-detail/grade-detail.component/grade-detail.component').then(
    (m) => m.GradeDetailComponent,
  );

export const appRoutes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },

  // Students
  { path: 'students', loadComponent: loadStudentListComponent },
  { path: 'students/create', loadComponent: loadStudentCreateComponent },
  { path: 'students/edit/:id', loadComponent: loadStudentEditComponent },
  { path: 'students/detail/:id', loadComponent: loadStudentDetailComponent },

  // Professors
  { path: 'professors', loadComponent: loadProfessorListComponent },
  { path: 'professors/create', loadComponent: loadProfessorCreateComponent },
  { path: 'professors/edit/:id', loadComponent: loadProfessorEditComponent },
  { path: 'professors/detail/:id', loadComponent: loadProfessorDetailComponent },

  // Grades
  { path: 'grades', loadComponent: loadGradeListComponent },
  { path: 'grades/create', loadComponent: loadGradeCreateComponent },
  { path: 'grades/edit/:id', loadComponent: loadGradeEditComponent },
  { path: 'grades/detail/:id', loadComponent: loadGradeDetailComponent },

  { path: '**', redirectTo: 'students' },
];
