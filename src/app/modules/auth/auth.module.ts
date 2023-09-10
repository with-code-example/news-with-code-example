import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginRoutingModule } from './login.routing.module';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatModule } from '../../mat.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    MatModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
