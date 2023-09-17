import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { MatModule } from 'src/app/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { HelperdModule } from 'src/app/helpers/helper.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TagFeedsComponent } from './components/tag-feeds/tag-feeds.component';
import { TagsComponent } from './components/tags/tags.component';
import { ReadPostComponent } from './components/read-post/read-post.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeedCardComponent,
    TagFeedsComponent,
    TagsComponent,
    ReadPostComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatModule,
    ReactiveFormsModule,
    HelperdModule,
    InfiniteScrollModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
  ]
})
export class HomeModule { }
