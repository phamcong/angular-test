import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedGridComponent } from './advanced-grid.component';

describe('AdvancedGridComponent', () => {
  let component: AdvancedGridComponent;
  let fixture: ComponentFixture<AdvancedGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
