import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProductComponent } from './no-product.component';

describe('NoProductComponent', () => {
  let component: NoProductComponent;
  let fixture: ComponentFixture<NoProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
