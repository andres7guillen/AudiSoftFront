import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student, CreateStudent, UpdateStudent } from '../models/student.model';
import { Observable } from 'rxjs';
import { PagedResult } from '../models/paged-result.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private api = 'https://localhost:7046/api/students';

  constructor(private http: HttpClient) {}

  getAll(page = 1, pageSize = 10): Observable<PagedResult<Student>> {
    return this.http.get<PagedResult<Student>>(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  getStudents() {
    return this.http.get<PagedResult<Student>>(`${this.api}?page=1&pageSize=100`);
  }

  getById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.api}/${id}`);
  }

  create(data: CreateStudent): Observable<Student> {
    return this.http.post<Student>(this.api, data);
  }

  update(data: UpdateStudent): Observable<Student> {
    return this.http.put<Student>(this.api, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api}/${id}`);
  }
}
