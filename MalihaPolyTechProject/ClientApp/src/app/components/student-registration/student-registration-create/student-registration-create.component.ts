import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../models/data/course-model';
import { Department } from '../../../models/data/department-model';
import { Student } from '../../../models/data/student-model';
import { StudentRegistration } from '../../../models/data/student-registration-model';
import { NotifyService } from '../../../services/common/notify.service';
import { CourseService } from '../../../services/data/course.service';
import { DepartmentService } from '../../../services/data/department.service';
import { StudentRegistrationService } from '../../../services/data/student-registration.service';
import { StudentService } from '../../../services/data/student.service';

@Component({
  selector: 'app-student-registration-create',
  templateUrl: './student-registration-create.component.html',
  styleUrls: ['./student-registration-create.component.css']
})
export class StudentRegistrationCreateComponent implements OnInit {
  studentReg!: StudentRegistration;
  selectedStudent: string | undefined = '';
  selectedStudentDept: string | undefined = '';
  students: Student[] = [];
  courses: Course[] = [];
  departments: Department[] = [];
  constructor(
    private studentRegService: StudentRegistrationService,
    private studentService: StudentService,
    private courseService: CourseService,
    private departmentService: DepartmentService,
    private notifyService: NotifyService,
    private matDiagRef: MatDialog,
    private datePipe: DatePipe
  ) { }
  save(f: NgForm) {
    if (f.invalid) return;
    this.studentReg.enrollDate = new Date(<string>this.datePipe.transform(this.studentReg.enrollDate, "yyyy-MM-dd"));
    console.log(this.studentReg);
    this.studentRegService.create(this.studentReg)
      .subscribe(r => {
        this.notifyService.success("Data saved", "DISMISS");
      }, err => {
        this.notifyService.fail("Failed to save data", "DISMISS");
      });

  }
  studentSelectionChanged(ev: any) {
    let id: Number = ev.value;
    let s = this.students.find(x => x.studentId == id);
    this.selectedStudent = s ? s.name : '';
    let did = s?.departmentId;
    let d = this.departments.find(x => x.departmentId == Number(did));
    this.selectedStudentDept = d ? d.departmentName : '';
  }
  ngOnInit(): void {
    this.studentReg = { studentId: undefined, courseId: undefined, enrollDate: undefined, isPaymentComplete: false }
    this.courseService.get()
      .subscribe(r => {
        this.courses = r;
      }, err => {
        this.notifyService.fail("Failed to load course", "DISMISS");
      });
    this.studentService.get()
      .subscribe(r => {
        this.students = r;
      }, err => {
        this.notifyService.fail("Failed to load students", "DISMISS");
      });
    this.departmentService.get()
      .subscribe(r => {
        this.departments = r;
      }, err => {
        this.notifyService.fail("Failed to load departments", "DISMISS");
      });
  }

}
