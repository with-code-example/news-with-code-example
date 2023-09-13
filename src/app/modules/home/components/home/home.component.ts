import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Query } from 'appwrite';
import {FormControl} from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public queries: any;
  public loadMoreText: string = "Load More"
  public loading: boolean = false
  public fetchTags: any = []
  public limit: number = 12
  public page: number = 0
  public total: number = 0
  public feeds: any = []
  tagsForm = new FormControl('');
  public tags: any[] = [];
  public feed_links: any = []


  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ){}
  
  ngOnInit(): void {
    this.getAllFeeds()
    this.fetchAllTags()
  }

  fetchAllTags(){

    let allTags = this.configService.getLocalStorage('all_tags')
    if (allTags) { 
      this.tags = JSON.parse(allTags)
      return; 
    }

    this.apiService.db().listDocuments(
      environment.database.tech_news,
      environment.database.collection.tags,
      [
        Query.notEqual('title', ''),
        Query.orderDesc('post_count'),
        Query.limit(10)
      ]
    ).then((resp: any) => {
      if (resp.total > 0){
        this.tags = resp.documents
        this.configService.setLocalStorage('all_tags', JSON.stringify(this.tags), 60)
      }
    }, err => {

    })
  }

  getAllFeeds(){
    
    this.loading = true

    let all_feeds_urls = this.configService.getLocalStorage('all_feeds_urls')
    if (all_feeds_urls) { 
      this.feed_links = JSON.parse(all_feeds_urls)
      this.getFeeds();
      return; 
    }

    this.apiService
      .db()
      .listDocuments(
        environment.database.tech_news,
        environment.database.collection.feeds,
        [
          Query.isNull('user_id')
        ]
      )
      .then(
        (response: any) => {
          response.documents.forEach((resp: any) => {
            this.feed_links.push(resp.url);
          });
          if(this.feed_links.length > 0){
            this.configService.setLocalStorage('all_feeds_urls', JSON.stringify(this.feed_links), 240)
            this.getFeeds();
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }

  getFeeds() {

    // let feeds = this.configService.getLocalStorage(`feeds_${this.limit}_${this.page}_${JSON.stringify(this.fetchTags)}`)
    // if (feeds) { 
    //   this.feeds = JSON.parse(feeds)
    //   return; 
    // }
    
    this.loading = true
    this.loadMoreText = 'Loading...';
    this.queries = []
    if (this.fetchTags.length > 0) {
      this.queries.push(Query.search('categories', `'${this.fetchTags}'`))
    }
    this.queries.push(
      Query.equal('feed_link', this.feed_links),
      Query.isNotNull('short_description'),
      Query.limit(this.limit),
      Query.offset(this.page * this.limit),
      Query.orderDesc('published_at'),
      Query.select(['title','image','short_description','categories','$id','link','published_at'])
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

            //this.configService.setLocalStorage(`feeds_${this.limit}_${this.page}_${JSON.stringify(this.fetchTags)}`, JSON.stringify(this.feeds), 60)
            
          }
          this.loadMoreText = 'Load More';
          this.loading = false
        },
        (err: any) => {
          console.log(err)
          this.loading = false
        }
      );
  }

  pagination() {
    console.log(this.page)
    this.page = this.page + 1;
    this.getFeeds();
  }

  filterTags(){
    this.page = 0
    this.feeds = []
    
    this.fetchTags = this.tagsForm.value
    this.getFeeds()
  }

}
