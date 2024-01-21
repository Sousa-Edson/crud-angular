import { CoursesService } from './../service/courses.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Course } from '../model/course';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule,CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category']; 

  // coursesService: CoursesService;

  constructor(private coursesService: CoursesService) {
    //  this.coursesService = new CoursesService;
    this.courses$ = this.coursesService.list();
  }

  ngOnInit(): void {

  }
}
