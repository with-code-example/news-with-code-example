import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Query } from 'appwrite';
import {FormControl} from '@angular/forms';
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
  public tags: string[] = ['javascript', 'python'];
  public feed_links: any = []


  constructor(private apiService: ApiService){}
  
  ngOnInit(): void {
    this.getAllFeeds()
  }

  getAllFeeds(){
    this.loading = true

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
            console.log(resp.url)
          });
          if(this.feed_links.length > 0){
            this.getFeeds();
          }
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
      Query.equal('feed_link', this.feed_links),
      Query.isNotNull('short_description'),
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
          console.log(err)
          this.loading = false
        }
      );
  }

  pagination(page: number) {
    this.page = page;
    this.getFeeds();
  }

  filterTags(){
    this.page = 0
    this.feeds = []
    
    this.fetchTags = this.tagsForm.value
    this.getFeeds()
  }

}
