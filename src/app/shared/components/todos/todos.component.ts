import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Todo} from "../../../data.service";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'hd-todos',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  @Input() todos: Todo[] = [];

  @Output() deleteTodo: EventEmitter<number> = new EventEmitter<number>();

  // TODO - might need to replace the mat-list with something else.
}
