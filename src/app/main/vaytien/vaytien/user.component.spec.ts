import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaytienComponent } from './Vaytien.component';

describe('UserComponent', () => {
  let component: VaytienComponent;
  let fixture: ComponentFixture<VaytienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaytienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaytienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
