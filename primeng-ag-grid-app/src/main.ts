import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; // Import provideRouter

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]) // Provide router configuration
  ]
}).catch(err => console.error(err));
