import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/data/course-model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  get(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/Courses');
  }
  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`/api/Courses/${id}`);
  }
  create(c: Course): Observable<Course> {
    return this.http.post<Course>('/api/Courses', c);
  }
  update(c: Course): Observable<any> {
    return this.http.put<any>(`/api/Courses/${c.courseId}`, c);
  }
  delete(id: number): Observable<Course> {
    return this.http.delete<Course>(`/api/Courses/${id}`);
  }
}
