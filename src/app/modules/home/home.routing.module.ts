import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TagFeedsComponent } from './components/tag-feeds/tag-feeds.component';
import { ReadPostComponent } from './components/read-post/read-post.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    
  },
  {
    path: 'tag/:tag', component: TagFeedsComponent
  },
  {
    path: 'read/:post', component: ReadPostComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class HomeRoutingModule { }