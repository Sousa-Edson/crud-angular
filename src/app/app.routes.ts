import { CoursesComponent } from './courses/containers/courses/courses.component';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' }
  ,
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then(m => m.COUSES_ROUTES)
  },{
    path: 'student',
    loadComponent: () => import('./courses/containers/course-form/course-form.component').then(m => m.CourseFormComponent)
  }
];
