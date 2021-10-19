import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPgeComponent } from './user-pge.component';

describe('UserPgeComponent', () => {
  let component: UserPgeComponent;
  let fixture: ComponentFixture<UserPgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
