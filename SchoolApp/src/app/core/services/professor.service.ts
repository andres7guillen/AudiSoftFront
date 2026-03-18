import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Professor, CreateProfessor, UpdateProfessor } from '../models/professor.model';
import { Observable } from 'rxjs';
import { PagedResult } from '../models/paged-result.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private api = 'https://localhost:7046/api/professors';

  constructor(private http: HttpClient) {}

  getAll(page: number, pageSize: number) {
    return this.http.get<PagedResult<Professor>>(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  getById(id: string): Observable<Professor> {
    return this.http.get<Professor>(`${this.api}/${id}`);
  }

  create(data: CreateProfessor): Observable<Professor> {
    return this.http.post<Professor>(this.api, data);
  }

  update(data: UpdateProfessor): Observable<Professor> {
    return this.http.put<Professor>(this.api, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api}/${id}`);
  }
}
