import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IPostServiceToken, PostService } from '../../core';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule.forRoot(),
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [PostComponent],
  providers: [{
    provide: IPostServiceToken,
    useClass: PostService
  }]
})
export class PostModule { }
