import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from '../../../models/data/course-model';
import { CourseService } from '../../../services/data/course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  course: Course = { courseId: null, title: '', fee: null, seatCount: null };
  constructor(private courseSvc: CourseService) { }

  save(f: NgForm) {
    console.log(this.course);
    console.log(f);
    this.courseSvc.create({ courseId:0, title: this.course.title, fee: this.course.fee, seatCount: this.course.seatCount })
      .subscribe(r => {
        f.form.reset({});
        f.form.markAsUntouched();
        this.course = { courseId: null, title: '', fee: null, seatCount: null };
      }, err => {
        console.log(err);
      })
  }
  ngOnInit(): void {
    
  }

}
