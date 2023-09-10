import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFeedsComponent } from './components/my-feeds/my-feeds.component';
import { AddFeedComponent } from './components/add-feed/add-feed.component';

const routes: Routes = [
  { path: 'my-feeds', component: MyFeedsComponent, },
  { path: 'my-feeds/:feed', component: MyFeedsComponent },
  { path: 'add-new', component: AddFeedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class UserRoutingModule { }