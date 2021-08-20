import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubjectComponent } from './editsubject.component';

describe('EditsubjectComponent', () => {
  let component: EditsubjectComponent;
  let fixture: ComponentFixture<EditsubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
