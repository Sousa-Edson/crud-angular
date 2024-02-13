import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../model/course';

import { CategoryPipe } from '../../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  imports: [CategoryPipe],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  onAdd() {
    this.add.emit(true);
    // this.router.navigate(['new'], { relativeTo: this.route });
  }
  onEdit(course: Course) {
    this.edit.emit(course);
  }
  onDelete(course: Course) {
    this.delete.emit(course);
  }
}
