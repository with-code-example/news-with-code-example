import { enableProdMode } from "@angular/core";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Sentry from "@sentry/angular-ivy";

import { AppModule } from './app/app.module';

Sentry.init({
  dsn: "https://26c67ea5d7d3dfdf31ad213b1a9d5b52@o514513.ingest.sentry.io/4505877961834496",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/tchnws\.netlify\.app\/api/],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((success) => console.log('Bootstrap success'))
  .catch(err => console.error(err));
