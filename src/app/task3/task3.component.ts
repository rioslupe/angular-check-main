import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from "@angular/material/divider";
import {TodoFormComponent} from "../shared/components/todo-form/todo-form.component";
import {TodosComponent} from "../shared/components/todos/todos.component";
import {Todo} from "../shared/models/todo";
import {DataService} from "../shared/services/data.service";
import {Category} from "../shared/models/category";
import {CategoryFormComponent} from "../shared/components/category-form/category-form.component";
import {TaskComponent} from "../shared/components/task/task.component";

@Component({
  selector: 'hd-task3',
  standalone: true,
  imports: [CommonModule, MatDividerModule, TodoFormComponent, TodosComponent, CategoryFormComponent, TaskComponent],
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss']
})
export class Task3Component implements OnInit {
  todos: Todo[] = [];
  categories: Category[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (todos) => {
        this.todos = todos;
      }
    });
    this.dataService.getCategoryData().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }

  addTodo(event: { text: string, category?: Category }) {
    this.dataService.add(event);
  }

  deleteTodo(event: number) {
    this.dataService.remove(event);
  }

  updateTodo(event: Todo) {
    this.dataService.update(event);
  }

  addCategory(event: string) {
    this.dataService.addCategory({text: event});
  }
}
