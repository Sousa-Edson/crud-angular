import { MatSnackBar} from '@angular/material/snack-bar'
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
 import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of, tap } from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../service/courses.service';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  imports: [
    AppMaterialModule,
    CommonModule,
    CategoryPipe,
    CoursesListComponent,
    MatDialogModule,
  ],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<CoursePage> | null = null;

  // coursesService: CoursesService;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex=0;
  pageSize=10;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  refresh( pageEvent:PageEvent ={length:0,pageIndex:0,pageSize:10}) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(tap(()=>{
      this.pageIndex = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;
    }),
      catchError((error) => {
        this.onError('Erro ao carregar');
        return of({ courses: [], totalElements: 0, totalPages: 0 });
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }
}
