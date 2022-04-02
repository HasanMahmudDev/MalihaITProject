import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/data/course-model';
import { NotifyService } from '../../../services/common/notify.service';
import { CourseService } from '../../../services/data/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  course!: Course;
  constructor(
    private courseService: CourseService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  save(f: NgForm) {
    if (f.invalid) return;
    this.courseService.update(this.course)
      .subscribe(r => {
        f.form.markAsPristine();
        f.form.markAsUntouched();
        this.notifyService.success('Update successful', 'DISMISS');
        
      }, err => {
        this.notifyService.fail('Update failed.', 'DISMISS');
      });
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getById(Number(id))
      .subscribe(r => {
        this.course = r;
        console.log(this.course);
      }, err => {

      });
  }

}
