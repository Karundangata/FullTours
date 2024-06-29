import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTourComponent } from './manage-tour.component';

describe('ManageTourComponent', () => {
  let component: ManageTourComponent;
  let fixture: ComponentFixture<ManageTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
