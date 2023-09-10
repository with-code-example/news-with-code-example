import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { REGISTER_FORM_MODEL } from '../../forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form: any= new FormGroup({});
  formFields: FormlyFieldConfig[] = REGISTER_FORM_MODEL
  public error: string = ''

  onSubmit() {

  }
}
