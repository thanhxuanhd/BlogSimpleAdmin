import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCategoryComponent } from './post-category.component';
import { PostCategoryRoutingModule } from './post-category-router.module';
import { SharedModule } from '../../shared/shared.module';
import { IPostCategoryServiceToken, PostCategoryService } from '../../core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    PostCategoryRoutingModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [PostCategoryComponent],
  providers: [{
    provide: IPostCategoryServiceToken,
    useClass: PostCategoryService
  }]
})
export class PostCategoryModule { }
