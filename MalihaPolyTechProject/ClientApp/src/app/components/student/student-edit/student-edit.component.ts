import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../../models/data/department-model';
import { Student } from '../../../models/data/student-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';
import { StudentService } from '../../../services/data/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  student!: Student;
  departments: Department[] = [];
  constructor(
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private notifyService: NotifyService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute

  ) { }
  save(f: NgForm) {
    if (f.invalid) return;
    console.log(this.student);
    this.student.dateOfBirth = new Date(<string>this.datePipe.transform(this.student.dateOfBirth, "yyyy-MM-dd"));
    
    this.studentService.update(this.student)
      .subscribe(x => {
        this.notifyService.success("Data saved", "DISMISS");
      }, err => {
        this.notifyService.fail("Failed to save data", "DISMISS");
      })
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params["id"];
    this.studentService.getById(Number(id))
      .subscribe(r => {
        this.student = r;
      }, err => {
        this.notifyService.fail("Failed to load student info", "DISMISS");
      })
    this.departmentService.get()
      .subscribe(r => {
        this.departments = r;
      }, err => {
        this.notifyService.fail("Failed to load departments", "DISMISS");
      });
  }

}
