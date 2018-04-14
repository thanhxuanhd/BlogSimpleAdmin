import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ],
  declarations: [PostComponent]
})
export class PostModule { }
