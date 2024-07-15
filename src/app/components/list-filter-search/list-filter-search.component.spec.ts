import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterSearchComponent } from './list-filter-search.component';

describe('ListFilterSearchComponent', () => {
  let component: ListFilterSearchComponent;
  let fixture: ComponentFixture<ListFilterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFilterSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
