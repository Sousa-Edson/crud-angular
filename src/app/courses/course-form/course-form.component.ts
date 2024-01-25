import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../service/courses.service';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service:CoursesService,
    private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => console.log(result),error => this.onError());
  }

  onCancel() {}

  private onError(){
    this.snackBar.open("Erro ao salvar o curso",'',{
      duration: 3000
    });
  }
}
