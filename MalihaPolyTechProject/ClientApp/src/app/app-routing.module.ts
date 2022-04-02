import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { CourseViewComponent } from './components/course/course-view/course-view.component';
import { StudentRegistrationCreateComponent } from './components/student-registration/student-registration-create/student-registration-create.component';
import { StudentRegistrationEditComponent } from './components/student-registration/student-registration-edit/student-registration-edit.component';
import { StudentRegistrationViewComponent } from './components/student-registration/student-registration-view/student-registration-view.component';
import { StudentCreateComponent } from './components/student/student-create/student-create.component';
import { StudentEditComponent } from './components/student/student-edit/student-edit.component';
import { StudentViewComponent } from './components/student/student-view/student-view.component';
import { DepartmentViewComponent } from './components/department/department-view/department-view.component';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CourseViewComponent },
  { path: 'course-create', component: CourseCreateComponent },
  { path: 'course-edit/:id', component: CourseEditComponent },
  { path: 'students', component: StudentViewComponent },
  { path: 'student-create', component: StudentCreateComponent },
  { path: 'student-edit/:id', component: StudentEditComponent },
  { path: 'student-registrations', component: StudentRegistrationViewComponent },
  { path: 'student-registration-create', component: StudentRegistrationCreateComponent },
  { path: 'student-registration-edit/:sid/:cid', component: StudentRegistrationEditComponent },
  { path: 'departments', component: DepartmentViewComponent },
  { path: 'department-create', component: DepartmentCreateComponent },
  { path: 'department-edit/:id', component: DepartmentEditComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
