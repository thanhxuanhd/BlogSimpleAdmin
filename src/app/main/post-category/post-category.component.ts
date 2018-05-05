import { Component, OnInit, Inject } from '@angular/core';
import {
  IPostCategoryServiceToken,
  IPostCategoryService,
  PostCategoryViewModel,
  PageViewModel,
  ConfigService
} from '../../core';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  postCategorys: Array<PostCategoryViewModel>;
  page: PageViewModel;
  keyword: string;
  constructor(
    @Inject(IPostCategoryServiceToken) private postCategoryService: IPostCategoryService,
    private configService: ConfigService) {
    this.page = new PageViewModel();
    this.page.PageSize = this.configService.getConfiguration().PAGE_CONFIG.PageSize;
    this.page.ColumnWith = this.configService.getConfiguration().PAGE_CONFIG.ColumnWith;
    this.page.FooterHeight = this.configService.getConfiguration().PAGE_CONFIG.FooterHeight;
    this.page.HeaderHeight = this.configService.getConfiguration().PAGE_CONFIG.HeaderHeight;
    this.page.RowHeight = this.configService.getConfiguration().PAGE_CONFIG.RowHeight;
    this.setPage({ offset: 0 });
  }

  ngOnInit() {

  }

  searchPostCategory(event) {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.PageIndex = pageInfo.offset;
    this.postCategoryService.Get(this.keyword, '', this.page.PageIndex, this.page.PageSize).subscribe((response => {
      if (response) {
        this.postCategorys = response.Items;
        this.page.TotalCount = response.TotalCount;
      }
    }), error => { });
  }

  addPostCategory(event) {

  }
  editPostCategory(event, postId) {

  }

  deletePostCategory(event, postId) {

  }
}
