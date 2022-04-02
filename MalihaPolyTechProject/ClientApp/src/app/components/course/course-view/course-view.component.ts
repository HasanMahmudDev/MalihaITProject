import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../models/data/course-model';
import { CourseService } from '../../../services/data/course.service';
import { ConfirmDailogComponent } from '../../shared/confirm-dailog/confirm-dailog.component';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  courses: Course[] = [];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource(this.courses);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList = ["title", "fee",'seatCount', "actions"];

  constructor(
    private courseService: CourseService,
    private matDiagRef: MatDialog
  ) { }
  delete(item: Course) {
    this.matDiagRef.open(ConfirmDailogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.courseService.delete(Number(item.courseId))
            .subscribe(x => {
              this.dataSource.data = this.dataSource.data.filter(c => c.courseId != item.courseId);
            }, r => { });
        }
      }, err => {

      });
  }
  ngOnInit(): void {
    this.courseService.get()
      .subscribe(r => {
        this.dataSource.data = r;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {

      })
  }

}
