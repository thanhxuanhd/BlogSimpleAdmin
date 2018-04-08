import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthenService, IAuthenServiceToken, NotificationService } from '../core';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [
    {
      provide: IAuthenServiceToken,
      useClass: AuthenService
    },
    NotificationService
  ]
})
export class LoginModule { }
