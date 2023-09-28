import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { TagFeedsState } from 'src/app/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Meta, Title } from '@angular/platform-browser';

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
    private store: Store,
    private metaService: Meta,
    private titleService: Title
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
      
      var title = this.post.title
      this.titleService.setTitle(title)
      this.metaService.addTags([
        { name:'description',content: this.post.short_description.slice(0,160) },
        { property: 'og:title', content: title },
        { property:'og:description',content: this.post.short_description.slice(0,160) },
        { property:'og:image',content: this.post.image },
        { property:'og:url',content: this.post.link },
        { property:'og:type',content: "website" },
        { property:'og:site_name',content: "" },
        { name: 'robots', content: 'noindex,nofollow' },
        { name: 'author', content: 'With Code Example' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image', content: this.post.image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: this.post.short_description.slice(0,160) },
      ]);

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
