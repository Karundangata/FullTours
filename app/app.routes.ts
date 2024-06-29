import { Routes, provideRouter } from '@angular/router';
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component';
import { AdminComponent} from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { LogoutAdminComponent} from './logout-admin/logout-admin.component';
import { ManageUserComponent} from './maanage-users/maanage-users.component';
import { ManageBookingComponent} from './manage-booking/manage-booking.component';
import { ManageHotelComponent} from './manage-hotel/manage-hotel.component';
import { ManageTourComponent } from './manage-tour/manage-tour.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    {path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'booking', component: BookingComponent},
    {path: 'login', component: LoginComponent },
    {path: 'logout-admin', component: LogoutAdminComponent},
    {path: 'manage-hotel', component: ManageHotelComponent},
    {path: 'manage-tour', component: ManageTourComponent},
    {path: 'manage-users', component:ManageUserComponent},
    {path: 'manage-booking', component: ManageBookingComponent},
];

export const appRoutes = provideRouter(routes);