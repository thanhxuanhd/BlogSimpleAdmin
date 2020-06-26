import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtService } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';
import { IAuthenServiceToken } from './tokens';
import { AuthenService } from './services/authen.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    JwtService,
    {
      provide: IAuthenServiceToken,
      useClass: AuthenService
    }
  ]
})
export class CoreModule { }
