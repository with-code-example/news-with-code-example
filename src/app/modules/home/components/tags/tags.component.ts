import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from 'src/environments/environment';
import { Query } from 'appwrite';
import { StateReset } from 'ngxs-reset-plugin';
import { TagFeedsState } from 'src/app/store';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {

  public tags = [];
  public tagsMenuData = { tags: this.tags };


  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private store: Store
  ){
    this.fetchAllTags()
  }

  fetchAllTags() {
    let allTags = this.configService.getLocalStorage('all_tags');
    if (allTags) {
      this.tags = JSON.parse(allTags);
      this.tagsMenuData = { tags: this.tags };
      return;
    }
    this.apiService
      .db()
      .listDocuments(
        environment.database.tech_news,
        environment.database.collection.tags,
        [
          Query.notEqual('title', ''),
          Query.orderDesc('post_count'),
          Query.limit(15),
        ]
      )
      .then(
        (resp: any) => {
          if (resp.total > 0) {
            this.tags = resp.documents;
            this.tagsMenuData = { tags: this.tags };
            this.configService.setLocalStorage(
              'all_tags',
              JSON.stringify(this.tags),
              60
            );
          }
        },
        (err) => {}
      );
  }

  clearState() {
    this.store.dispatch(new StateReset(TagFeedsState));
  }

}
