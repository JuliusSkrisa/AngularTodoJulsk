import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsCollectionComponent } from './todo-lists-collection.component';

describe('TodoListsCollectionComponent', () => {
  let component: TodoListsCollectionComponent;
  let fixture: ComponentFixture<TodoListsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListsCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
