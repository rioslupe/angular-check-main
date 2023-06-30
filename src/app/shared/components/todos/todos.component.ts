import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TodoDialogComponent} from "../todo-dialog/todo-dialog.component";
import {Todo} from "../../models/todo";
import {MatInputModule} from "@angular/material/input";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'hd-todos',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [MatDialog]
})
export class TodosComponent implements OnChanges {
  @Input() canEdit = false;
  @Input() canFilter = false;
  @Input() todos: Todo[] = [];

  @Output() deleteTodo: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateTodo: EventEmitter<{ id: number, text: string }> = new EventEmitter<{ id: number, text: string }>();

  // TODO - might need to replace the mat-list with something else.
  displayTodos: Todo[] = [];

  constructor(public dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todos'] && changes['todos'].currentValue) {
      this.displayTodos = changes['todos'].currentValue;
    }
  }

  openTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: todo,
    });

    dialogRef.afterClosed().subscribe((text: string) => {
      if (text) {
        this.updateTodo.emit({id: todo.id, text})
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayTodos = [...this.todos].filter((todo) => todo.text.includes(filterValue) || todo.category?.text.includes(filterValue))
  }

  delete(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: todo,
    });

    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.deleteTodo.emit(todo.id)
      }
    });
  }
}
