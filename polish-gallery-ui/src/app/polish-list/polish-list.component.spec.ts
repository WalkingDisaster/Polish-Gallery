/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PolishListComponent } from './polish-list.component';

describe('PolishListComponent', () => {
  let component: PolishListComponent;
  let fixture: ComponentFixture<PolishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
