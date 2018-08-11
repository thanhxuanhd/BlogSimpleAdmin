import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuthenServiceToken, AuthenService, DataService } from '../core';
import { IDataServiceToken } from '../core/tokens/data.service.token';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { HandErrorService } from '../core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({}),
    NgbModule.forRoot()
  ],
  declarations: [ErrorComponentComponent],
  exports: [
    ErrorComponentComponent,
    TranslateModule],
  providers: [
    {
      provide: IAuthenServiceToken,
      useClass: AuthenService
    },
    {
      provide: IDataServiceToken,
      useClass: DataService
    },
    HandErrorService,
    NgbActiveModal
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        {
          provide: IAuthenServiceToken,
          useClass: AuthenService
        },
        {
          provide: IDataServiceToken,
          useClass: DataService
        },
        HandErrorService
      ]
    };
  }

  public static forChild(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [HandErrorService]
    };
  }
}
