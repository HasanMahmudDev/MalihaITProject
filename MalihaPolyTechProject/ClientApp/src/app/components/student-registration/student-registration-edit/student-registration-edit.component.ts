import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../models/data/department-model';
import { Student } from '../../../models/data/student-model';
import { StudentRegistration } from '../../../models/data/student-registration-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';
import { StudentRegistrationService } from '../../../services/data/student-registration.service';
import { StudentService } from '../../../services/data/student.service';

@Component({
  selector: 'app-student-registration-edit',
  templateUrl: './student-registration-edit.component.html',
  styleUrls: ['./student-registration-edit.component.css']
})
export class StudentRegistrationEditComponent implements OnInit {

  studentRegistrations: StudentRegistration[] = [];
  departments: Department[] = [];
  students: Student[] = [];
  dataSource: MatTableDataSource<StudentRegistration> = new MatTableDataSource(this.studentRegistrations);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList = ["studentId", "courseId","enrollDate",  "actions"];

  constructor(
    private studentRegService: StudentRegistrationService,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private notifyService: NotifyService,
    private matDiagRef: MatDialog
  ) { }
  delete(item: StudentRegistration) {}
  ngOnInit(): void {
    this.studentRegService.get()
      .subscribe(r => {
        console.log(r);
        this.dataSource.data = r;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }, err => {
        this.notifyService.fail("Failed to load registtaions", "DISMISS")
      });
  }

}
