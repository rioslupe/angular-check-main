import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Category} from "../../models/category";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'hd-todo-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatIconModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnChanges {
  @Input() hasCategory = false;
  @Input() categories: Category[] = [];
  @Output() addTodo: EventEmitter<{ text: string, category?: Category }> = new EventEmitter<{ text: string, category?: Category }>();

  // TODO - come back and make this a type form.
  form: UntypedFormGroup;
  minlength = 3;

  constructor(private builder: UntypedFormBuilder) {
    this.form = this.builder.group({
      text: [null, [Validators.required, Validators.minLength(this.minlength)]],
      category: null,
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hasCategory'] && changes['hasCategory'].currentValue) {
      this.form.controls['category'].setValidators([Validators.required]);
    }

    if (changes['categories'] && changes['categories'].currentValue.length) {
      if (this.categories.length === 1) {
        this.form.controls['category'].setValue(this.categories[0])
      }
    }
  }

  createTodo() {
    if (this.form.valid) {
      this.addTodo.emit(this.form.value);
      this.form.reset();
    }
  }
}
