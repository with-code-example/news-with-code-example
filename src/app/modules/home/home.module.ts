import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { MatModule } from 'src/app/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { HelperdModule } from 'src/app/helpers/helper.module';
@NgModule({
  declarations: [
    HomeComponent,
    FeedCardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatModule,
    ReactiveFormsModule,
    HelperdModule
  ]
})
export class HomeModule { }
