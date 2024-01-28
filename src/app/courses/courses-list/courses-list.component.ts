import { Component, Input, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../model/course';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CategoryPipe } from "../../shared/pipes/category.pipe";

@Component({
    selector: 'app-courses-list',
    standalone: true,
    templateUrl: './courses-list.component.html',
    styleUrl: './courses-list.component.scss',
    imports: [AppMaterialModule, CategoryPipe]
})
export class CoursesListComponent  {
 @Input() courses: Course[] = [];

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
