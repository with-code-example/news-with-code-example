import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { TagFeedsState } from 'src/app/store';
import { StateReset } from 'ngxs-reset-plugin';
@Component({
  selector: 'home-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent {
  
  @Input() item: any;


  public likeCount = 0
  public isLiked = false
  public likeID = ''
  public userId = ""

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

    this.likeCount = this.item.like_count? this.item.like_count: 0
    this.userId = this.authService.userId()
    this.isLiked = this.item.like_users.find((user: any) => user == this.userId)? true: false

  }
  

  navigateTo(route: string, data: any){
    this.router.navigate([route], {state: {data}});
  }

  likeDislikePost(isLiked: boolean){
    this.apiService.account().getSession('current').then((isAuth: any) => {
      if(isAuth){

        if(isLiked){
          this.isLiked = false
          this.likeCount = this.likeCount - 1 
          // delete like
          this.item.like_users =  this.item.like_users.filter((user: any) => user !== isAuth.userId);
          
        }else{
          
          this.isLiked = true
          this.likeCount = this.likeCount + 1
          // add like record
          this.item.like_users.push(isAuth.userId);
        }
        this.apiService.db().updateDocument(
          environment.database.tech_news,
          environment.database.collection.posts,
          this.item.$id,
          {
            "like_users": this.item.like_users,
            "like_count": this.likeCount
          }
        ).then((resp: any) => {
          this.item = resp
        })

      }else{
        this.alert.openSnackBar("Authentication is required", "Close")
        this.router.navigate(['/auth/login'])
      }
    }, err => {
      console.error(err);
      this.alert.openSnackBar("Authentication is required", "Close")
      this.router.navigate(['/auth/login'])
    })    
  }

  clearState() {
    this.store.dispatch(new StateReset(TagFeedsState));
  }

  hashtags(arr: any){
    return encodeURIComponent(arr.join(','))
  }

  shareTitle(title: string){
    return encodeURIComponent(title)
  }

  shareLink(id: string) {
    return encodeURIComponent(`${environment.baseUrl}/read/${id}`)
  }
  postLink(url: string): string {
    return encodeURIComponent(url)
  }

  shareSummary(summary: string) {
    return encodeURIComponent(summary)
  }

  copyShare(item: any){
    let text = `${item.title} - ${environment.baseUrl}/read/${item.$id}, ${ item.link}`
    navigator.clipboard.writeText(text);
    this.alert.openSnackBar(" ", "Ok")
  }

}
