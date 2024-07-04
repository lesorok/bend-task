import { Routes } from '@angular/router';

import { appPaths } from '@shared/configs/app-paths.config';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: appPaths.ASYNC,
  },
  {
    path: appPaths.ASYNC,
    loadComponent: () =>
      import('@pages/async/async-page.component').then(
        m => m.AsyncPageComponent,
      ),
  },
  {
    path: appPaths.Subscription,
    loadComponent: () =>
      import('@pages/subscription/subscription-page.component').then(
        m => m.SubscriptionPageComponent,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: appPaths.NOT_FOUND,
  },
  {
    path: appPaths.NOT_FOUND,
    loadComponent: () =>
      import('@pages/not-found/not-found-page.component').then(
        m => m.NotFoundPageComponent,
      ),
  },
];
