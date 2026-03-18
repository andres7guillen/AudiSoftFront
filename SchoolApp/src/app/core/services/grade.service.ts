import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateGrade, Grade, UpdateGrade } from '../models/grade.model';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private api = 'https://localhost:7046/api/grades';

  constructor(private http: HttpClient) {}

  getAll(page = 1, pageSize = 10): Observable<any> {
    return this.http.get(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  create(data: CreateGrade): Observable<Grade> {
    return this.http.post<Grade>(this.api, data);
  }

  update(data: UpdateGrade): Observable<Grade> {
    return this.http.put<Grade>(this.api, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
