import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryFormComponent} from "../shared/components/category-form/category-form.component";
import {MatDividerModule} from "@angular/material/divider";
import {TodoFormComponent} from "../shared/components/todo-form/todo-form.component";
import {TodosComponent} from "../shared/components/todos/todos.component";
import {Todo} from "../shared/models/todo";
import {Category} from "../shared/models/category";
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'hd-task4',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent, MatDividerModule, TodoFormComponent, TodosComponent],
  templateUrl: './task4.component.html',
  styleUrls: ['./task4.component.scss']
})
export class Task4Component implements OnInit {
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

