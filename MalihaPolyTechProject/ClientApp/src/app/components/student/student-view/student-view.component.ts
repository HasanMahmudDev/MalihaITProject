import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../models/data/department-model';
import { Student } from '../../../models/data/student-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';
import { StudentService } from '../../../services/data/student.service';
import { ConfirmDailogComponent } from '../../shared/confirm-dailog/confirm-dailog.component';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  students: Student[] = [];
  departments: Department[] = [];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource(this.students);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList = ["name", "dateOfBirth", "departmentId", "actions"];

  constructor(
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private notifyService: NotifyService,
    private matDiagRef: MatDialog
  ) { }
  getDeptName(id: number) {
    return this.departments.find(d => d.departmentId == id)?.departmentName;
  }
  delete(item: Student) {
    this.matDiagRef.open(ConfirmDailogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.studentService.delete(Number(item.studentId))
            .subscribe(x => {
              this.dataSource.data = this.dataSource.data.filter(c => c.studentId != item.studentId);
              this.notifyService.success("Data deleted", "DISMISS");
            }, r => {
              
            });
        }
      }, err => {
        this.notifyService.fail("Failed to delete", "DISMISS");
      });
  }
  ngOnInit(): void {
    this.studentService.get()
      .subscribe(r => {
        console.log(r);
        this.dataSource.data = r;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }, err => {
        this.notifyService.fail("Failed to load students", "DISMISS");
      });
    this.departmentService.get()
      .subscribe(r => {
        this.departments = r;
      }, err => {
        this.notifyService.fail("Failed to load students", "DISMISS");
      });
  }

}
