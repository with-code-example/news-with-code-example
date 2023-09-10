import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFeedsComponent } from './components/my-feeds/my-feeds.component';

import { UserRoutingModule } from './user.routing.module';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { MatModule } from 'src/app/mat.module';
import { StripHtmlPipe, ShortenPipe } from 'src/app/helpers/pipe';
import { AddFeedComponent } from './components/add-feed/add-feed.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    MyFeedsComponent,
    FeedCardComponent,
    StripHtmlPipe,
    ShortenPipe,
    AddFeedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule
  ],
  exports: [
    
  ]
})
export class UserModule { }
