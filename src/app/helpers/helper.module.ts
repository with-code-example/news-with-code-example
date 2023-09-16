import { NgModule } from '@angular/core';

import { StripHtmlPipe, ShortenPipe } from 'src/app/helpers/pipe';
import { LazyImgDirective } from './LazyImgDirective';

@NgModule({
  declarations: [StripHtmlPipe,ShortenPipe, LazyImgDirective],
  // exports is required so you can access your component/pipe in other modules
  exports: [StripHtmlPipe, ShortenPipe, LazyImgDirective]
})
export class HelperdModule{}