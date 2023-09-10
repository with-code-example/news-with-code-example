import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent {

  @Input() item: any;
  constructor(private router: Router) {}
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

}
