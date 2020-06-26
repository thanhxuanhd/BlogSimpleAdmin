import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IAuthenServiceToken,
  DataService,
  IHelperServiceToken,
  HelperService,
  ErrorService,
  IErrorServiceToken,
  SanitizeHtmlPipe,
  INotificationServiceToken,
  NotificationService
} from '../core';
import { IDataServiceToken } from '../core/tokens/data.service.token';
import { ErrorComponent } from './error-component/error-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({}),
    ModalModule.forRoot()
  ],
  declarations: [ErrorComponent, SanitizeHtmlPipe],
  exports: [
    ErrorComponent,
    TranslateModule,
    SanitizeHtmlPipe
  ],
  providers: [
    {
      provide: IDataServiceToken,
      useClass: DataService
    },
    {
      provide: IHelperServiceToken,
      useClass: HelperService
    },
    {
      provide: IErrorServiceToken,
      useClass: ErrorService
    },
    {
      provide: INotificationServiceToken,
      useClass: NotificationService
    }
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return <ModuleWithProviders<SharedModule>>{
      ngModule: SharedModule,
      providers: [
        {
          provide: IDataServiceToken,
          useClass: DataService
        },
        {
          provide: IHelperServiceToken,
          useClass: HelperService
        },
        {
          provide: IErrorServiceToken,
          useClass: ErrorService
        },
      ]
    };
  }

  public static forChild(): ModuleWithProviders<SharedModule> {
    return <ModuleWithProviders<SharedModule>>{
      ngModule: SharedModule,
      providers: [
        {
          provide: IErrorServiceToken,
          useClass: ErrorService
        },
        {
          provide: INotificationServiceToken,
          useClass: NotificationService
        }
      ]
    };
  }
}
