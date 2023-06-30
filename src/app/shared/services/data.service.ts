import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #initialData: Todo[] = [];
  #data = new BehaviorSubject<Todo[]>([]);
  #nextId = 1;

  readonly #defaultTodo: Todo = {
    id: -1,
    text: '',
    completed: false,
  };

  constructor() {
    this.initialize();
  }

  public resetData(): void {
    this.initialize();
  }

  public getData(): Observable<Todo[]> {
    return this.#data.asObservable();
  }

  public add(todo: Partial<Todo>): Observable<Todo> {
    const newTodo = {...this.#defaultTodo, ...todo, id: this.#nextId++};
    this.#data.next([...this.#data.value, newTodo]);
    return of(newTodo);
  }

  public remove(id: number): Observable<void> {
    this.#data.next(this.#data.value.filter((t) => t.id !== id));
    return of();
  }

  public update(id: number, text: string): Observable<void> {
    // TODO - come back and verify this is how you want to update the array.
    this.#data.next([...this.#data.value.map((todo) => {
      if (todo.id === id) {
        return {...todo, text}
      }
      return todo;
    })]);
    return of();
  }

  private initialize() {
    this.#nextId = this.#initialData.length + 1;
    this.#data.next(this.#initialData);
  }
}
