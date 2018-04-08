import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ThemesModule } from '../themes/themes.module';
import { MainRoutingModule } from './main-routing.module';
@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ThemesModule.forRoot()
  ],
  declarations: [MainComponent]
})
export class MainModule { }
