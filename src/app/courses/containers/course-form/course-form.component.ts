import { Course } from './../../model/course';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { 
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../service/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.min(5), Validators.maxLength(100)],
    ],
    category: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,

  ) {}
  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    console.log(course);
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', '', {
      duration: 3000,
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar o curso', ' ', {
      duration: 3000,
    });
  }
  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo Obigatório';
    }
    return 'Erro';
  }
}
