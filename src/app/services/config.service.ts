import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Query } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public children: any[] = [];
  sidenavItems: any[];
  private configDataSource = new BehaviorSubject({});
  currentConfigData = this.configDataSource.asObservable();

  private sidenavDataSource = new BehaviorSubject([]);
  currentSidenavData = this.sidenavDataSource.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.sidenavItems = [];
  }

  changeData(newUserData: any) {
    this.configDataSource.next(newUserData);
  }

  changeSidenavData(newData: any) {
    this.sidenavDataSource.next(newData);
  }

  getLocalStorage(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // Item has expired
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  sidenavData(userId = '') {
    if (userId == '') {
      let user: any = this.getLocalStorage('user');
      if (user) {
        user = JSON.parse(user);
        userId = user.userId;
      }
    }
    this.children = [];

    console.log(userId);
    if (userId) {
      this.apiService
        .db()
        .listDocuments(
          environment.database.tech_news,
          environment.database.collection.feeds,
          [Query.equal('user_id', userId), Query.orderDesc('$createdAt')]
        )
        .then(
          (response: any) => {
            if (response.total > 0) {
              let feeds = response.documents;

              feeds.forEach((feed: any) => {
                let feedData = {
                  title: feed.title,
                  click: {
                    route: '/user/my-feeds/' + feed.$id,
                    feed: feed,
                  },
                  icon: 'chevron_right',
                };
                this.children.push(feedData);
              });
            }
          },
          (err: any) => {
            console.error(err);
          }
        );

      this.sidenavItems = [
        {
          title: 'Home',
          icon: 'home',
          route: '/',
        },
        {
          title: 'Add New Source',
          icon: 'add',
          route: '/user/add-new',
        },
        {
          title: 'My Feeds',
          icon: 'list',
          route: '/user/my-feeds',
          children: this.children,
        },
        {
          title: 'Logout',
          icon: 'logout',
          route: '/auth/logout',
        },
      ];
    } else {
      this.sidenavItems = [
        {
          title: 'Home',
          icon: 'home',
          route: '/',
        },
        {
          title: 'Login',
          icon: 'login',
          route: '/auth/login',
        },
        {
          title: 'Sign Up',
          icon: 'login',
          route: '/auth/sign-up',
        },
      ];
    }
    this.changeSidenavData([]);
    this.changeSidenavData(this.sidenavItems);
  }
}
