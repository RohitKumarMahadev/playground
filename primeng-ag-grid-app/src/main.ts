import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; // Import provideRouter

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]), // Provide router configuration
    provideAnimations() // Enable Angular animations for PrimeNG components
  ]
}).catch(err => console.error(err));