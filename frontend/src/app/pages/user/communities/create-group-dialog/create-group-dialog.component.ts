import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../../../../core/data-access/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../../core/feature/material/material.module';

@Component({
  selector: 'app-create-group-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './create-group-dialog.component.html',
  styleUrl: './create-group-dialog.component.scss',
})
export class CreateGroupDialogComponent {
  dialogRef = inject(MatDialogRef);
  filesService = inject(FileService);
  snackbar = inject(MatSnackBar);
  imageId: any = -1;
  fb = new FormBuilder();

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;
    if (this.imageId == -1) {
      this.snackbar.open('Image is required');
      return;
    }
    let data = {
      ...this.form.value,
      imageId: this.imageId,
    };
    console.log(data);
    this.dialogRef.close(data);
  }

  onUploadFile($event: Event) {
    this.filesService.addFile($event).subscribe((res: any) => {
      this.imageId = res;
    });
  }
}
