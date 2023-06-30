import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDialogComponent } from './todo-dialog.component';

describe('TodoDialogComponent', () => {
  let component: TodoDialogComponent;
  let fixture: ComponentFixture<TodoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoDialogComponent]
    });
    fixture = TestBed.createComponent(TodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
