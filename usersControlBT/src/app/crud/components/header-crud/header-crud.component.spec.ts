import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCrudComponent } from './header-crud.component';

describe('HeaderCrudComponent', () => {
  let component: HeaderCrudComponent;
  let fixture: ComponentFixture<HeaderCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
