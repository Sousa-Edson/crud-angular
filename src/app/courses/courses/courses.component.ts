import { Component, OnInit } from '@angular/core';


import { Course } from '../model/course';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses: Course[];

  displayedColumns = ['name', 'category'];

  constructor() {
    this.courses = [{_id:"1",name:"Angular",category:"front-end"},
    {_id:"2",name:"Java",category:"back-end"}
];
  }

  ngOnInit(): void {}
}
