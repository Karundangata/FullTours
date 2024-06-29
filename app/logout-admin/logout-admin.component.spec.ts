import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutAdminComponent } from './logout-admin.component';

describe('LogoutAdminComponent', () => {
  let component: LogoutAdminComponent;
  let fixture: ComponentFixture<LogoutAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
