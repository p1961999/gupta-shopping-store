import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAuthComponent } from './users-auth.component';

describe('UsersAuthComponent', () => {
  let component: UsersAuthComponent;
  let fixture: ComponentFixture<UsersAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
