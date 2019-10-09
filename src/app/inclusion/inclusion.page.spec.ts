import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InclusionPage } from './inclusion.page';

describe('InclusionPage', () => {
  let component: InclusionPage;
  let fixture: ComponentFixture<InclusionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InclusionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InclusionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
