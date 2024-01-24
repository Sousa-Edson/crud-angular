import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from './../service/courses.service';
import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  imports: [AppMaterialModule, CommonModule, CategoryPipe],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category', 'actions'];

  // coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //  this.coursesService = new CoursesService;
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
