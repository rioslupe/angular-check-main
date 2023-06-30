import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Todo} from "../shared/models/todo";
import {DataService} from "../shared/services/data.service";
import {TodosComponent} from "../shared/components/todos/todos.component";
import {TodoFormComponent} from "../shared/components/todo-form/todo-form.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'hd-task2',
  standalone: true,
  imports: [CommonModule, TodosComponent, TodoFormComponent, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatListModule],
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss']
})
export class Task2Component implements OnInit {
  todos: Todo[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (todos) => {
        this.todos = todos;
      }
    });
  }

  addTodo(event: string) {
    this.dataService.add({text: event});
  }

  deleteTodo(event: number) {
    this.dataService.remove(event);
  }

  updateTodo(event: {id: number, text: string}) {
    this.dataService.update(event.id, event.text);
  }
}
