import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../../models/data/department-model';
import { NotifyService } from '../../../services/common/notify.service';
import { DepartmentService } from '../../../services/data/department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  department!: Department;
  constructor(
    private departmentService: DepartmentService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  save(f: NgForm) {
    if (f.invalid) return;
    this.departmentService.update(this.department)
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
    this.departmentService.getById(Number(id))
      .subscribe(r => {
        this.department = r;
        console.log(this.department);
      }, err => {

      });
  }

}
