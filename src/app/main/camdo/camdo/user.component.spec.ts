import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamdoComponent } from './Camdo.component';

describe('UserComponent', () => {
  let component: CamdoComponent;
  let fixture: ComponentFixture<CamdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
