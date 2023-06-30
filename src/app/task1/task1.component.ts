import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosComponent} from "../shared/components/todos/todos.component";
import {TodoFormComponent} from "../shared/components/todo-form/todo-form.component";
import {MatDividerModule} from "@angular/material/divider";
import {Todo} from "../shared/models/todo";
import {DataService} from "../shared/services/data.service";
import {TaskComponent} from "../shared/components/task/task.component";

@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [CommonModule, TodosComponent, TodoFormComponent, MatDividerModule, TaskComponent],
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss']
})
export class Task1Component implements OnInit {
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

  addTodo(event: {text: string}) {
    this.dataService.add(event);
  }

  deleteTodo(event :number) {
    this.dataService.remove(event);
  }
}
