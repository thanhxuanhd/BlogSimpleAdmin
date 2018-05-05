import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCategoryComponent } from './post-category.component';
import { PostCategoryRoutingModule } from './post-category-router.module';
import { SharedModule } from '../../shared/shared.module';
import { IPostCategoryServiceToken, PostCategoryService } from '../../core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    PostCategoryRoutingModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PostCategoryComponent],
  providers: [{
    provide: IPostCategoryServiceToken,
    useClass: PostCategoryService
  }]
})
export class PostCategoryModule { }
