import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevActivComponent } from './rev-activ.component';

describe('RevActivComponent', () => {
  let component: RevActivComponent;
  let fixture: ComponentFixture<RevActivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevActivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevActivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
