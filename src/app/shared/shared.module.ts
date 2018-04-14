import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuthenServiceToken, AuthenService, DataService } from '../core';
import { IDataServiceToken } from '../core/tokens/data.service.token';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: IAuthenServiceToken,
      useClass: AuthenService
    },
    {
      provide: IDataServiceToken,
      useClass: DataService
    }
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
        }
      ]
    };
  }
}
