import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaanageUsersComponent } from './maanage-users.component';

describe('MaanageUsersComponent', () => {
  let component: MaanageUsersComponent;
  let fixture: ComponentFixture<MaanageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaanageUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaanageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
