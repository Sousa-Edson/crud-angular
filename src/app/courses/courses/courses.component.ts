import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses: Course[];

  displayedColumns = ['name', 'category'];

  constructor() {
    this.courses = [{_id:"1",name:"Angular",category:"front-end"}];
  }

  ngOnInit(): void {}
}
