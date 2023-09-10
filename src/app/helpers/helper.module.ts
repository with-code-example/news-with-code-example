import { NgModule } from '@angular/core';

import { StripHtmlPipe, ShortenPipe } from 'src/app/helpers/pipe';

@NgModule({
  declarations: [StripHtmlPipe,ShortenPipe],
  // exports is required so you can access your component/pipe in other modules
  exports: [StripHtmlPipe, ShortenPipe]
})
export class HelperdModule{}