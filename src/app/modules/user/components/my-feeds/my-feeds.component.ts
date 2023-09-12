import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Query } from 'appwrite';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-my-feeds',
  templateUrl: './my-feeds.component.html',
  styleUrls: ['./my-feeds.component.css']
})
export class MyFeedsComponent {

  public feeds: any = [];
  public userId: string = "";
  public urls: any[] = [];
  public page: number = 0;
  public loadMoreText: string = 'Load More';
  public total: number = 0
  public limit: number = 12
  public state: any
  public feed : any;
  public loading: boolean = false
  public tag: any;
  tagsForm = new FormControl('');
  public tags: string[] = ['javascript', 'python'];
  public feed_links: any[] = []
  public fetchTags: any = []
  public queries: any
  public allFeeds: any 
  public currentFeed: string = ""

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    
  }

  ngOnInit(): void {
    this.configService.changeData({ title: 'Loading...' });

    let user: any = this.authService.getLocalStorage('user');
    user = JSON.parse(user);
    this.userId = user.userId;

    let feed_id: string = this.route.snapshot.paramMap.get('feed') || '';

    if (!feed_id){
      this.getAllFeeds()
    }else{
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        // do your task for before route
        return false;
      };

      this.state = this.route.paramMap.pipe(map(() => window.history.state))
      this.state.subscribe((routeData: any) => {
        if(routeData.data && routeData.data.feed){
          this.allFeeds = routeData.data.allFeeds;
          this.urls.push(routeData.data.feed.url)
          this.getFeeds();
          this.currentFeed = routeData.data.feed.$id
          // this.feed.url = routeData.data.feed.url
          this.configService.changeData({ title: routeData.data.feed.title });
        }else{
          console.log("getFeedData")
          this.getFeedData()
        }
      })
    }
  }

  getAllFeeds(){
    this.loading = true

    this.apiService
      .db()
      .listDocuments(
        environment.database.tech_news,
        environment.database.collection.feeds,
        [
          Query.equal('user_id', this.userId)
        ]
      )
      .then(
        (response: any) => {
          this.allFeeds = response.documents
          response.documents.forEach((resp: any) => {
            this.urls.push(resp.url);
          });
          if(this.urls.length > 0){
            this.getFeeds();
          }
          this.configService.changeData({ title: 'Dashboard' });
        },
        (err) => {
          console.error(err);
        }
      );

  }

  getFeeds() {
    this.loading = true
    this.loadMoreText = 'Loading...';
    this.queries = []
    if (this.fetchTags.length > 0) {
      this.queries.push(Query.search('categories', `'${this.fetchTags}'`))
    }
    this.queries.push(
      Query.equal('feed_link', this.urls),
      Query.notEqual('short_description', ""),
      Query.limit(this.limit),
      Query.offset(this.page * this.limit),
      Query.orderDesc('$createdAt'),
      Query.select(['title','image','short_description','categories','$id','link'])
    )
   
    this.apiService
      .db()
      .listDocuments(
        environment.database.tech_news,
        environment.database.collection.posts,
        this.queries
      )
      .then(
        (response: any) => {
          if (response.total > 0) {
            this.total = response.total
            response.documents.forEach((feed: any) => {
              this.feeds.push(feed);
            });
            
          }
          this.loadMoreText = 'Load More';
          this.loading = false
        },
        (err: any) => {
          this.loading = false
        }
      );
  }

  getFeedData(){
    this.loading = true
    let feed_id: string = this.route.snapshot.paramMap.get('feed') || '';

    if (feed_id != '') {
      this.apiService
        .db()
        .getDocument(
          environment.database.tech_news,
          environment.database.collection.feeds,
          feed_id
        )
        .then(
          (response: any) => {
            this.feed = response;
            this.configService.changeData({ title: this.feed.title });
            this.getFeeds();
          },
          (err) => {
            console.error(err);
          }
        );
    }
  }

  pagination(page: number) {
    this.page = page;
    console.log(this.page)
    this.getFeeds();
  }

  onScroll(){
    console.log(this.page)
    this.page++;
    this.getFeeds();
    
  }

  filterTags(){
    this.page = 0
    this.feeds = []
    
    this.fetchTags = this.tagsForm.value
    this.getFeeds()
  }

  navigateTo(route: string, feed: any = '') {
    this.router.navigate([route], { state: { data: { feed, "allFeeds": this.allFeeds } } });
  }

  funcTest(){
    this.apiService.functions().createExecution(
      "64fc3d0476892c6021ea", 
      "",
      true,
      '/',
      'GET',
    ).then((resp: any) => {
      if(resp.status == "completed"){
        var response = JSON.parse(resp.responseBody)
        console.log(response)
      }
    },(err: any) => {
      console.log(err)
    })
  }

}
