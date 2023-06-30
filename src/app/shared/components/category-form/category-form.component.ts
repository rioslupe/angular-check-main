import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'hd-category-form',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  @Output() addCategory: EventEmitter<string> = new EventEmitter<string>();

  form: UntypedFormGroup;
  minlength = 3;

  constructor(private builder: UntypedFormBuilder) {
    this.form = this.builder.group({
      category: [null, [Validators.required, Validators.minLength(this.minlength)]]
    })
  }

  createCategory() {
    if(this.form.valid) {
      this.addCategory.emit(this.form.controls['category'].value);
      this.form.reset();
    }
  }
}
