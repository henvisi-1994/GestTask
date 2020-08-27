import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNotifHomeComponent } from './barra-notif-home.component';

describe('BarraNotifHomeComponent', () => {
  let component: BarraNotifHomeComponent;
  let fixture: ComponentFixture<BarraNotifHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraNotifHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraNotifHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
