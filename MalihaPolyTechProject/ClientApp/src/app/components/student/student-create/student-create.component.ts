import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../../models/data/student-model';
import { Department } from '../../../models/data/department-model';
import { DepartmentService } from '../../../services/data/department.service';
import { NotifyService } from '../../../services/common/notify.service';
import { DatePipe } from '@angular/common';
import { StudentService } from '../../../services/data/student.service';


@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  student!: Student;
  departments: Department[] = [];
  constructor(
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private notifyService: NotifyService,
    private datePipe: DatePipe

  ) { }
  save(f: NgForm) {
    if (f.invalid) return;
    console.log(this.student);
    this.student.dateOfBirth = new Date(<string>this.datePipe.transform(this.student.dateOfBirth, "yyyy-MM-dd"));
    this.student.studentId = 0;
    this.studentService.create(this.student)
      .subscribe(x => {
        this.notifyService.success("Data saved", "DISMISS");
      }, err => {
        this.notifyService.fail("Failed to save data", "DISMISS");
      })
  }
  ngOnInit(): void {
    this.student = { studentId: undefined, name: '', dateOfBirth: undefined, departmentId: 0 };
    this.departmentService.get()
      .subscribe(r => {
        this.departments = r;
      }, err => {
        this.notifyService.fail("Failed to load departments", "DISMISS");
      });
  }

}
