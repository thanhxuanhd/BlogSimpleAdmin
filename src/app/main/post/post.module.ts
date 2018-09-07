import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  IPostServiceToken,
  PostService,
  IPostCategoryServiceToken,
  PostCategoryService
} from '../../core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule.forRoot(),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  declarations: [PostComponent, PostAddEditComponent],
  providers: [
    {
      provide: IPostServiceToken,
      useClass: PostService
    },
    {
      provide: IPostCategoryServiceToken,
      useClass: PostCategoryService
    }
  ]
})
export class PostModule { }
