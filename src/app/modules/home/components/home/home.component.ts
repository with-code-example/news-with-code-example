import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Query } from 'appwrite';
import { FormControl } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { FeedsState, Feeds, TagFeedsState } from 'src/app/store';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StateReset } from 'ngxs-reset-plugin';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public queries: any;
  public loadMoreText: string = 'Load More';
  public loading: boolean = true;
  public fetchTags: any = [];
  public limit: number = 12;
  public page: number = 0;
  public tagPage: number = 0;
  public total: number = 0;
  // public feeds: any = []
  tagsForm = new FormControl('');
  public feed_links: any = [];
  public userInfo: any[] = [];
  public tag: string = '';
  public feedAvaliable = false;
  public tagFeedAvaliable = false;

  @Select(FeedsState.getFeeds) feeds$: Observable<any[]>;
  @Select(FeedsState.getTotal) total$: Observable<any[]>;
  @Select(FeedsState.getPage) page$: Observable<any[]>;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.tag = this.route.snapshot.paramMap.get('tag') || '';

    this.feeds$.subscribe((resp: any) => {
      if (resp.length > 0) {
        this.feedAvaliable = true;
        this.page$.subscribe((page: any) => {
          this.page = page;
        });
      }
      this.getFeeds();
    });
  }


  public feeds = [];
  getFeeds() {
    this.loading = true
    this.queries = [];
    
    this.queries.push(
      Query.limit(this.limit),
      // Query.notEqual('image',''),
      Query.offset(this.page * this.limit),
      Query.orderDesc('published_at'),
      Query.select([
        'title',
        'image',
        'categories',
        '$id',
        'link',
        'published_at',
        'like_count',
        'like_users',
        'short_description'
      ])
    );

    if (!this.feedAvaliable) {
      var feed = this.store.dispatch(
        new Feeds.Fetch({ queries: this.queries, page: this.page })
      );
      feed.subscribe((state) => {
        this.total = state.feedsState.total;
        this.loading = false
      });
    }
    
  }

  pagination() {
    this.page = this.page + 1;
    this.feedAvaliable = false;
    this.getFeeds();
  }
  
  storageTest(){
    console.log("Storage Test")
    var file = this.apiService.storage().getFileView(
      environment.buckets.images,
      '650186672c650bfac1e7'
    )
    console.log(file)
  }


}
