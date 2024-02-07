import { Course } from './../../model/course';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../service/courses.service';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array([this.retrieveLesson(course)]),
    });
    console.log(this.form);
    console.log(this.form.value);
  }

  private retrieveLesson(course: Course) {
    const lessons = [];

    if (course?.lessons) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name], //, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      youtubeUrl: [lesson.youtubeUrl], // [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
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
      return 'Campo Obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }
}
