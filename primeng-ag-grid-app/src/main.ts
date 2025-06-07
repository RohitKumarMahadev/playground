import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import provideAnimations

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]), // Provide router configuration
    provideAnimations() // Add provideAnimations here
  ]
}).catch(err => console.error(err));
