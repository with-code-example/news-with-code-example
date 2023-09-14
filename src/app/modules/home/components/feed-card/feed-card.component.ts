import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { ID, Query } from 'appwrite'
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LikesState, Likes } from 'src/app/store';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'home-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent {
  
  @Input() item: any;

  @Select(LikesState.getLikes) likes$: Observable<any[]>;

  public likeCount = 0
  public isLiked = false
  public likeID = ''

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alert: AlertService,
    private store: Store,
    private authService: AuthService
  ) {
  }
  


  ngOnInit() {
    if(this.item.image == ""){
      
      let desc = this.item.description

      const parser = new DOMParser();
      const doc = parser.parseFromString(desc, 'text/html');

      // Use querySelectorAll to find all img tags
      const imgTags = doc.querySelectorAll('img');
      let images = Array.from(imgTags).map((img) => img.getAttribute('src') || '');
      if (images.length > 0) {
        this.item.image = images[0]
      }

    }
    var queries: any[] = [
      Query.equal('post_id', this.item.$id),
      Query.select(['post_id', 'user_id', '$id']),
      Query.limit(1000),
    ]
    let likes = this.store.dispatch(new Likes.Fetch({queries: queries}));
    var userId = this.authService.userId()
    likes.subscribe(likeData => {
      
      
      likeData.likesState.likes.forEach((like: any) => {
        if(like.user_id == userId) { this.isLiked = true; this.likeID = like.$id}
        this.likeCount++
      })
    })

  }
  

  navigateTo(route: string, data: any){
    this.router.navigate([route], {state: {data}});
  }

  likeDislikePost(postId: string, isLiked: boolean, likeId: string){
    this.apiService.account().getSession('current').then((isAuth: any) => {
      if(isAuth){
        var userId = isAuth.userId
        
        if(isLiked){
          this.isLiked = false
          this.likeCount = this.likeCount - 1 
          // delete like
          this.apiService.db().deleteDocument(
            environment.database.tech_news,
            environment.database.collection.likes,
            likeId
          ).then(resp => {
            
            this.item.isLiked = false
            
          })
        }else{
          
          this.isLiked = true
          this.likeCount = this.likeCount + 1
          // add like record
          this.apiService.db().createDocument(
            environment.database.tech_news,
            environment.database.collection.likes,
            ID.unique(),
            {"post_id": postId, "user_id": userId}
          ).then((resp: any) => {
            this.item.likeID = resp.$id
            
          })

        }
      }else{
        this.alert.openSnackBar("Authentication is required", "Close")
        this.router.navigate(['/auth/login'])
      }
    }, err => {
      this.alert.openSnackBar("Authentication is required", "Close")
      this.router.navigate(['/auth/login'])
    })
  }

}
