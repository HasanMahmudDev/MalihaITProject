import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../../models/data/department-model';
import { DepartmentService } from '../../../services/data/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  department: Department = { departmentId: undefined, departmentName: '' };
  constructor(private departmentSvc: DepartmentService) { }

  save(f: NgForm) {
    console.log(this.department);
    console.log(f);
    this.departmentSvc.create({ departmentId: 0, departmentName: this.department.departmentName})
      .subscribe(r => {
        f.form.reset({});
        f.form.markAsUntouched();
        this.department = { departmentId: undefined, departmentName: ''};
      }, err => {
        console.log(err);
      })
  }
  ngOnInit(): void {

  }

}
