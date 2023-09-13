import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { REGISTER_FORM_MODEL } from '../../forms';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form: any= new FormGroup({});
  formFields: FormlyFieldConfig[] = REGISTER_FORM_MODEL
  public error: string = ''

  constructor(private apiService: ApiService){}

  onSubmit() {

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
  

}
