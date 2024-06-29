import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; 
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';


const combinedConfig = {
  ...appConfig,
  providers: [appRoutes]
};

bootstrapApplication(AppComponent, combinedConfig)
  .catch((err) => console.error(err));
