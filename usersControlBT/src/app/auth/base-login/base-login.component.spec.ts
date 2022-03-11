import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLoginComponent } from './base-login.component';

describe('BaseLoginComponent', () => {
  let component: BaseLoginComponent;
  let fixture: ComponentFixture<BaseLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
