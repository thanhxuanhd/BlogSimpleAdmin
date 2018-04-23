import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SIDEBAR_TOGGLE_DIRECTIVES } from '../themes/sidebar.directive';
import { NavigationComponent } from '../themes/header-navigation/navigation.component';
import { SidebarComponent } from '../themes/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../themes/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from '../themes/right-sidebar/rightsidebar.component';
import { RouterModule } from '@angular/router';
import { IAuthenServiceToken, AuthenService, NotificationService } from '../core';
const Components = [
  SIDEBAR_TOGGLE_DIRECTIVES,
  NavigationComponent,
  SidebarComponent,
  BreadcrumbComponent,
  RightSidebarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [...Components],
  exports: [...Components],
  providers: [{
    provide: IAuthenServiceToken,
    useClass: AuthenService
  },
    NotificationService
  ]
})
export class ThemesModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: ThemesModule, providers: [] };
  }
}
