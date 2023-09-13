import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { ID, Query } from 'appwrite'
 
@Component({
  selector: 'home-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent {

  @Input() item: any;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private alert: AlertService
  ) {}


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
  }

  navigateTo(route: string, data: any){
    this.router.navigate([route], {state: {data}});
  }

  likeDislikePost(postId: string, isLiked: boolean, likeId: string){
    this.apiService.account().getSession('current').then((isAuth: any) => {
      if(isAuth){
        var userId = isAuth.userId
        
        if(isLiked){
          this.item.isLiked = false
          this.item.likeCount = this.item.likeCount - 1 
          // delete like
          this.apiService.db().deleteDocument(
            environment.database.tech_news,
            environment.database.collection.likes,
            likeId
          ).then(resp => {
            
            this.item.isLiked = false
            
          })
        }else{
          
          this.item.isLiked = true
          this.item.likeCount = this.item.likeCount + 1
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
