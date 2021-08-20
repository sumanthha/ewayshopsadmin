import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMarkComponent } from './add-edit-mark.component';

describe('AddEditMarkComponent', () => {
  let component: AddEditMarkComponent;
  let fixture: ComponentFixture<AddEditMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
