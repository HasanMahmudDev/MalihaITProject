import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home/home.component';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { CourseViewComponent } from './components/course/course-view/course-view.component';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from './services/data/course.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfirmDailogComponent } from './components/shared/confirm-dailog/confirm-dailog.component';
import { StudentViewComponent } from './components/student/student-view/student-view.component';
import { StudentCreateComponent } from './components/student/student-create/student-create.component';
import { StudentEditComponent } from './components/student/student-edit/student-edit.component';
import { StudentService } from './services/data/student.service';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { StudentRegistrationService } from './services/data/student-registration.service';
import { StudentRegistrationViewComponent } from './components/student-registration/student-registration-view/student-registration-view.component';
import { StudentRegistrationCreateComponent } from './components/student-registration/student-registration-create/student-registration-create.component';
import { StudentRegistrationEditComponent } from './components/student-registration/student-registration-edit/student-registration-edit.component';
import { DepartmentService } from './services/data/department.service';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { DepartmentViewComponent } from './components/department/department-view/department-view.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';


@NgModule({
  declarations: [
  
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CourseViewComponent,
    CourseCreateComponent,
    CourseEditComponent,
    ConfirmDailogComponent,
    StudentViewComponent,
    StudentCreateComponent,
    StudentEditComponent,
    StudentRegistrationViewComponent,
    StudentRegistrationCreateComponent,
    StudentRegistrationEditComponent,
    DepartmentCreateComponent,
    DepartmentViewComponent,
    DepartmentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatImportModule,
    MatNativeDateModule
    
  ],
  entryComponents: [ConfirmDailogComponent],
  providers: [DatePipe, HttpClient, DepartmentService, CourseService, StudentService, StudentRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
