/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddPolishComponent } from './add-polish.component';

describe('AddPolishComponent', () => {
  let component: AddPolishComponent;
  let fixture: ComponentFixture<AddPolishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPolishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPolishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
