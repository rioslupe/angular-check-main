import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'hd-todo-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() addTodo: EventEmitter<string> = new EventEmitter<string>();

  // TODO - come back and make this a type form.
  form: UntypedFormGroup;
  minlength = 3;

  constructor(private builder: UntypedFormBuilder) {
    this.form = this.builder.group({
      todo: [null, [Validators.required, Validators.minLength(this.minlength)]]
    })
  }

  createTodo() {
    if (this.form.valid) {
      this.addTodo.emit(this.form.controls['todo'].value);
      this.form.reset();
    }
  }
}
