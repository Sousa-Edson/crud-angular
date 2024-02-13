import { Injectable } from '@angular/core';
import { Course } from '../model/course';

import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'http://localhost:8080/api/courses';
  constructor(private httpClient: HttpClient) {}

  list(page=0,pageSize=10) {
    return this.httpClient.get<CoursePage>(this.API,{params:{page,pageSize}})
    .pipe(
      first(),
      // delay(5000),
    //  tap((couses) => console.log)
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>) {
    if (record._id) {
    ///  console.log('update');
      return this.update(record);
    }
   // console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
  private update(record: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }
  remove(id: String) {
    return this.httpClient
    .delete<Course>(`${this.API}/${id}`)
    .pipe(first());
  }
}
