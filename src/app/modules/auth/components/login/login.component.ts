import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LOGIN_FORM_MODEL } from '../../forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = new FormGroup({});
  formFields: FormlyFieldConfig[] = LOGIN_FORM_MODEL;
  public error: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private configService: ConfigService,
    private apiService: ApiService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value;
      this.apiService
        .account()
        .createEmailSession(data.email, data.password)
        .then(
          (response: any) => {
            this.auth.setLocalStorage('user', JSON.stringify(response));
            this.configService.sidenavData(response.userId);
            this.configService.changeData({ sidenav: true });
            this.router.navigate(['/']);
          },
          (error: any) => {
            console.error(error.message);
            this.error = error.message;
          }
        );
    }
  }
  googleLogin() {
    this.apiService
      .account()
      .createOAuth2Session(
        'google',
        'http://localhost:4200/user/my-feeds',
        'http://localhost:4200/login'
      );
  }
}
