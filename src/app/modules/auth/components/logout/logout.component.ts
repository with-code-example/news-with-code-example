import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: [``]
})
export class LogoutComponent implements OnInit{
  constructor(
    private router: Router, 
    private apiService: ApiService, 
    private authService: AuthService,
    private configService: ConfigService
  ) {}
  ngOnInit(): void {
    let data: any = this.authService.getLocalStorage('user')
    data = JSON.parse(data)
    console.log(data)
    if (data){
      let sessionId = data.$id
      this.apiService.account().deleteSession(sessionId).then(function (response) {
      console.log("remove storage")
      localStorage.removeItem('user');    
      }, function (error) {
          console.log(error); // Failure
      });
    }
    setTimeout(()=>{
      this.configService.sidenavData()
      this.router.navigate(['/auth/login']);
    }, 1000)
    

  }
}
