import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../models/data/department-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  get(): Observable<Department[]> {
    return this.http.get<Department[]>('/api/Departments');
  }
  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`/api/Departments/${id}`);
  }
  create(c: Department): Observable<Department> {
    return this.http.post<Department>('/api/Departments', c);
  }
  update(c: Department): Observable<any> {
    return this.http.put<any>(`/api/Departments/${c.departmentId}`, c);
  }
  delete(id: number): Observable<Department> {
    return this.http.delete<Department>(`/api/Departments/${id}`);
  }
}
