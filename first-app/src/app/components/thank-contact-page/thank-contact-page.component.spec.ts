import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankContactPageComponent } from './thank-contact-page.component';

describe('ThankContactPageComponent', () => {
  let component: ThankContactPageComponent;
  let fixture: ComponentFixture<ThankContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankContactPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
