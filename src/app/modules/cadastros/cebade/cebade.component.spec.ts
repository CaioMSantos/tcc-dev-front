import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CebadeComponent } from './cebade.component';

describe('CebadeComponent', () => {
  let component: CebadeComponent;
  let fixture: ComponentFixture<CebadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CebadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CebadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
