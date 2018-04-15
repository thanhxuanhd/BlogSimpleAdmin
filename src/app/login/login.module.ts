import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthenService, IAuthenServiceToken, NotificationService } from '../core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule.forChild()
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
