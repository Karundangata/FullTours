import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHotelComponent } from './manage-hotel.component';

describe('ManageHotelComponent', () => {
  let component: ManageHotelComponent;
  let fixture: ComponentFixture<ManageHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
