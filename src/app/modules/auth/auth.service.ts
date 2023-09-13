import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public sdk: any;
  public account: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private configService: ConfigService
  ) {}

  
  setLocalStorage(
    key: string,
    value: string,
    expirationInMinutes: number = (60*24)
  ) {
    if (typeof window !== 'undefined') {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + expirationInMinutes * 60 * 1000, // Convert minutes to milliseconds
      };
      localStorage.setItem(key, JSON.stringify(item));
      return true
    }
    return false
  }

  // Function to get an item from LocalStorage and check its expiration
  getLocalStorage(key: string) {
    if (typeof window !== 'undefined') {
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
    return {}
    
  }

  userId(): string{

    var userId = ""
    let user: any = this.getLocalStorage('user');
    if(user){
      user = JSON.parse(user);
      userId = user.userId;
    }else{
      this.apiService
      .account()
      .getSession('current')
      .then((isAuthenticated) => {
        if (!isAuthenticated) {
          userId = "";
        } else {
          userId = isAuthenticated.userId
          this.setLocalStorage('user', JSON.stringify(isAuthenticated))
        }
      })
      .catch(() => {
        userId = "";
      });

    }
    return userId
  }

  canActivate(): any {
    if(this.getLocalStorage('user')){
      return true
    }
    return this.apiService
      .account()
      .getSession('current')
      .then((isAuthenticated) => {
        if (!isAuthenticated) {
          this.configService.changeData({ sidenav: false });
          this.router.navigate(['/auth/login']);
          return false;
        } else {
          this.configService.changeData({ sidenav: true });
          this.setLocalStorage('user', JSON.stringify(isAuthenticated))
          return true;
        }
      })
      .catch(() => {
        this.router.navigate(['/auth/login']);
        return false;
      });
  }
}
