import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent} from './signup/signup.component'
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import {BookingComponent } from './booking/booking.component';
import { LoginComponent} from './login/login.component';
import { LogoutAdminComponent } from './logout-admin/logout-admin.component';
import { ManageUserComponent } from './maanage-users/maanage-users.component';
import {ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageHotelComponent} from './manage-hotel/manage-hotel.component';
import { ManageTourComponent } from './manage-tour/manage-tour.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, ManageUserComponent, ManageTourComponent, ManageHotelComponent, ManageBookingComponent, SignupComponent, LogoutAdminComponent, LoginComponent,  BookingComponent, HomeComponent, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tours';
}
