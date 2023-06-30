import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Todo} from "../../models/todo";
import {Category} from "../../models/category";
import {DataService} from "../../services/data.service";
import {CategoryFormComponent} from "../category-form/category-form.component";
import {MatDividerModule} from "@angular/material/divider";
import {TodoFormComponent} from "../todo-form/todo-form.component";
import {TodosComponent} from "../todos/todos.component";

@Component({
  selector: 'hd-task',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent, MatDividerModule, TodoFormComponent, TodosComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {
  @Input() taskId = 0;
  @Input() hasCategory = false;
  @Input() canEdit = false;
  @Input() canEditCategory = false;
  @Input() canFilter = false;

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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hasCategory'] && changes['hasCategory'].currentValue) {
      this.dataService.getCategoryData().subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });
    }
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
