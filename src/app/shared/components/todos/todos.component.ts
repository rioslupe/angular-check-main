import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TodoDialogComponent} from "../todo-dialog/todo-dialog.component";
import {Todo} from "../../models/todo";

@Component({
  selector: 'hd-todos',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [MatDialog]
})
export class TodosComponent {
  @Input() canEdit = false;
  @Input() todos: Todo[] = [];

  @Output() deleteTodo: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateTodo: EventEmitter<{ id: number, text: string }> = new EventEmitter<{ id: number, text: string }>();

  // TODO - might need to replace the mat-list with something else.

  constructor(public dialog: MatDialog) {
  }

  openTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: todo,
    });

    dialogRef.afterClosed().subscribe((text: string) => {
      if (text) {
        this.updateTodo.emit({id: todo.id, text })
      }
    });
  }
}
