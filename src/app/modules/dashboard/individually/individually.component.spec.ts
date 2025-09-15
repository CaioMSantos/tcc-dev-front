import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividuallyComponent } from './individually.component';

describe('IndividuallyComponent', () => {
  let component: IndividuallyComponent;
  let fixture: ComponentFixture<IndividuallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividuallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
