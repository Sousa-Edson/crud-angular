import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  declarations: [],
  imports: [AppMaterialModule,CommonModule],
})
export class SharedModule {}
