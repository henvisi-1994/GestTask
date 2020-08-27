import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigActividadesComponent } from './asig-actividades.component';

describe('AsigActividadesComponent', () => {
  let component: AsigActividadesComponent;
  let fixture: ComponentFixture<AsigActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
