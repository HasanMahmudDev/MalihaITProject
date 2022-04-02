import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentRegistration } from '../../models/data/student-registration-model';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {

  constructor(private http: HttpClient) { }
  get(): Observable<StudentRegistration[]> {
    return this.http.get<StudentRegistration[]>('/api/StudentRegistrations');
  }
  getById(sid: number, cid: number): Observable<StudentRegistration> {
    return this.http.get<StudentRegistration>(`/api/StudentRegistrations/${cid}/${sid}`);
  }
  create(c: StudentRegistration): Observable<StudentRegistration> {
    return this.http.post<StudentRegistration>('/api/StudentRegistrations', c);
  }
  update(c: StudentRegistration): Observable<any> {
    return this.http.put<any>(`/api/StudentRegistrations/${c.courseId}`, c);
  }
  delete(id: number): Observable<StudentRegistration> {
    return this.http.delete<StudentRegistration>(`/api/StudentRegistrations/${id}`);
  }
}
