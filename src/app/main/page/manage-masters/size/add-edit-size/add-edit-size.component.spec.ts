import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSizeComponent } from './add-edit-size.component';

describe('AddEditSizeComponent', () => {
  let component: AddEditSizeComponent;
  let fixture: ComponentFixture<AddEditSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
