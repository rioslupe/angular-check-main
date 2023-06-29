import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosComponent} from "../shared/components/todos/todos.component";
import {DataService, Todo} from "../data.service";
import {TodoFormComponent} from "../shared/components/todo-form/todo-form.component";

@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [CommonModule, TodosComponent, TodoFormComponent],
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


  addTodo(event :string) {
    this.dataService.add({text: event});
  }

  deleteTodo(event :number) {
    this.dataService.remove(event);
  }
}
