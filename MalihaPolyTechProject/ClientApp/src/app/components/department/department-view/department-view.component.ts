import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../models/data/department-model';
import { DepartmentService } from '../../../services/data/department.service';
import { ConfirmDailogComponent } from '../../shared/confirm-dailog/confirm-dailog.component';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  department: Department[] = [];
  dataSource: MatTableDataSource<Department> = new MatTableDataSource(this.department);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList = ["departmentName", "actions"];

  constructor(
    private departmentService: DepartmentService,
    private matDiagRef: MatDialog
  ) { }
  delete(item: Department) {
    this.matDiagRef.open(ConfirmDailogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.departmentService.delete(Number(item.departmentId))
            .subscribe(x => {
              this.dataSource.data = this.dataSource.data.filter(d => d.departmentId != item.departmentId);
            }, r => { });
        }
      }, err => {

      });
  }
  ngOnInit(): void {
    this.departmentService.get()
      .subscribe(r => {
        this.dataSource.data = r;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {

      })
  }

}
