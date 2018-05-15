import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as $ from 'jquery';
import { environment } from '../environments/environment';
import { ConfigService } from './core';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './themes/spinner.component';
import { AppTranslationModule } from './app.translate.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppTranslationModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
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
