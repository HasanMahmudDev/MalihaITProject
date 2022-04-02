import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models/data/student-model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  get(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/Students');
  }
  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`/api/Students/${id}`);
  }
  create(c: Student): Observable<Student> {
    return this.http.post<Student>('/api/Students', c);
  }
  update(c: Student): Observable<any> {
    return this.http.put<any>(`/api/Students/${c.studentId}`, c);
  }
  delete(id: number): Observable<Student> {
    return this.http.delete<Student>(`/api/Students/${id}`);
  }
 
}
