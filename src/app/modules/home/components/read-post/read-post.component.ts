import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { TagFeedsState } from 'src/app/store';
import { StateReset } from 'ngxs-reset-plugin';


@Component({
  selector: 'app-read',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css']
})
export class ReadPostComponent implements OnInit{

  public post: any
  public loading: boolean = false;


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ){}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    var post = this.route.snapshot.paramMap.get('post') || '';
    this.getPost(post)
  }

  getPost(postId: string){
    this.loading = true
    this.apiService.db().getDocument(
      environment.database.tech_news,
      environment.database.collection.posts,
      postId
    ).then(post => {

      this.post = post
      const url = this.post.feed_link;
      let domain: any = (new URL(url));
      domain = domain.hostname;
      this.post.feed_domain = domain

      this.loading = false

    }, err => {
      console.error(err)
      this.loading = false
    })
  }

  clearState() {
    this.store.dispatch(new StateReset(TagFeedsState));
  }
}
