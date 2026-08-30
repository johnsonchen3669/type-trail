import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // GitHub Pages cannot rewrite deep links to index.html, so keep routes
    // client-side (for example, /#/day/1) to make refreshes reliable.
    provideRouter(routes, withHashLocation())
  ]
};
