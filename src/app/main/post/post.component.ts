import { Component, OnInit, Inject } from '@angular/core';
import { ConfigService, PageViewModel, PostViewModel, IPostServiceToken, IPostService } from '../../core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: Array<PostViewModel>;
  postCategory: any;
  keyword: string;
  page: PageViewModel;
  constructor(
    @Inject(IPostServiceToken) private postService: IPostService,
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

  searchPost(event) {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.PageIndex = pageInfo.offset;
    this.postService.Get(this.keyword, '', this.postCategory, this.page.PageIndex, this.page.PageSize, false).subscribe((response => {
      if (response) {
        this.posts = response.Items;
        this.page.TotalCount = response.TotalCount;
      }
    }), error => {
      this.postService.HandError(error);
    });
  }

  addPost(event) {

  }
  editPost(event, postId) {

  }

  deletePost(event, postId) {

  }

}
