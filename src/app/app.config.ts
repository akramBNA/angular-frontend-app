import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http'
// import { employeeReducer } from './store/employees.reducer';
// import { EmployeeEffects } from './store/employees.effects';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    // importProvidersFrom(HttpClient),
    provideHttpClient(withFetch()), provideAnimationsAsync(),
    // provideStore({ employee: employeeReducer }),  // Register your reducer
    // provideEffects([EmployeeEffects])
  ],
};
