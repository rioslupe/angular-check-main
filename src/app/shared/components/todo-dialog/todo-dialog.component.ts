import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Todo} from "../../models/todo";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DataService} from "../../services/data.service";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Category} from "../../models/category";

@Component({
  selector: 'hd-todo-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent {
  categories: Category[] = [];
  form: UntypedFormGroup;
  minlength = 3;

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo, canEditCategory: false },
    private builder: UntypedFormBuilder,
    private dataService: DataService
  ) {
    this.form = this.builder.group({
      text: [this.data.todo.text, [Validators.required, Validators.minLength(this.minlength)]],
      category: null,
    });

    if (this.data.canEditCategory) {
      this.form.controls['category'].setValidators([Validators.required]);

      this.dataService.getCategoryData().subscribe({
        next: (categories) => {
          this.categories = categories;
          this.form.controls['category'].setValue(this.data.todo.category);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    if (this.form.valid) {
      let updatedTodo: Todo = this.data.todo;
      updatedTodo = {...updatedTodo, text: this.form.controls['text'].value};

      if (this.data.canEditCategory) {
        updatedTodo = {...updatedTodo, category: this.form.controls['category'].value}
      }

      this.dialogRef.close(updatedTodo);
      this.form.reset();
    }
  }
}
