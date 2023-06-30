import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Todo} from "../../models/todo";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'hd-todo-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent {

  form: UntypedFormGroup;
  minlength = 3;

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private builder: UntypedFormBuilder
  ) {
    this.form = this.builder.group({
      todo: [this.data.text, [Validators.required, Validators.minLength(this.minlength)]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.controls['todo'].value);
      this.form.reset();
    }
  }
}
