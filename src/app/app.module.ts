import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as $ from 'jquery';
import { environment } from '../environments/environment';
import { ConfigService, CoreModule } from './core';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './themes/spinner.component';
import { AppTranslationModule } from './app.translate.module';
import { NotFoundComponent } from './shared';
import { ServiceWorkerModule } from '@angular/service-worker';
export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppTranslationModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
