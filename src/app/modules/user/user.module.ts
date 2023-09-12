import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFeedsComponent } from './components/my-feeds/my-feeds.component';

import { UserRoutingModule } from './user.routing.module';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { MatModule } from 'src/app/mat.module';
import { HelperdModule } from 'src/app/helpers/helper.module';
import { AddFeedComponent } from './components/add-feed/add-feed.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    MyFeedsComponent,
    FeedCardComponent,
    AddFeedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule,
    HelperdModule,
    InfiniteScrollModule
  ],
  exports: [
    
  ]
})
export class UserModule { }
