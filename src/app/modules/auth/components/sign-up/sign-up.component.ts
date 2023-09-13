import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { REGISTER_FORM_MODEL } from '../../forms';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ID } from 'appwrite';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form: any= new FormGroup({});
  formFields: FormlyFieldConfig[] = REGISTER_FORM_MODEL
  public error: string = ''

  constructor(
    private apiService: ApiService,
    private router: Router,
    
    ){}

  onSubmit() {

    if (this.form.valid) {
      const data = this.form.value;
      this.apiService.account().create(
          ID.unique(),
          data.email,
          data.password,
          data.name
      ).then((response: any) => {
          this.router.navigate(['/auth/login']);
      }, (error: any) => {
          console.error(error.message)
          this.error = error.message
      });
      
    }

  }

  googleSignup() {
    this.apiService
      .account()
      .createOAuth2Session(
        'google',
        environment.baseUrl + '/user/my-feeds',
        environment.baseUrl + '/auth/sign-up'
      );
  }

  githubSignup() {
    this.apiService
      .account()
      .createOAuth2Session(
        'github',
        environment.baseUrl + '/user/my-feeds',
        environment.baseUrl + '/auth/login'
      );
  }
  

}
