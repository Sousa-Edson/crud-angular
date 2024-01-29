import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { AppMaterialModule } from '../../app-material/app-material.module';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String
  ) {}
  onConfirm(result:boolean): void {
    this.dialogRef.close(result);
  }
}
