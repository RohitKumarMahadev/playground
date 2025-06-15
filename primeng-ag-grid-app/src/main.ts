import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import provideHttpClient and withInterceptorsFromDi

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()) // Add provideHttpClient with interceptor support
  ]
}).catch(err => console.error(err));
