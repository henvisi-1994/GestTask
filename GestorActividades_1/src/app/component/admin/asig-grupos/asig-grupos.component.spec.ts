import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigGruposComponent } from './asig-grupos.component';

describe('AsigGruposComponent', () => {
  let component: AsigGruposComponent;
  let fixture: ComponentFixture<AsigGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
