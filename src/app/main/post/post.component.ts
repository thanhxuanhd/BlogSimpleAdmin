import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import {
  ConfigService,
  PageViewModel,
  PostViewModel,
  IPostServiceToken,
  IPostService,
  ErrorHandle,
  INotificationService,
  INotificationServiceToken,
  TranslatesService
} from '../../core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postEntity: PostViewModel;
  posts: Array<PostViewModel>;
  postCategory = '';
  keyword = '';
  page: PageViewModel;
  modalRef: BsModalRef;
  isNew = true;
  public errors: ErrorHandle[] = [];
  constructor(
    @Inject(IPostServiceToken) private postService: IPostService,
    private configService: ConfigService,
    private modalService: BsModalService,
    @Inject(INotificationServiceToken) private notificationService: INotificationService,
    private translateService: TranslatesService) {
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

  addPost(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.errors = [];
    this.isNew = true;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
    this.postEntity = new PostViewModel();
  }

  editPost(event, postId, template: TemplateRef<any>) {
    event.preventDefault();
    this.isNew = false;
    this.errors = [];
    this.postEntity = new PostViewModel();
    this.postService.GetById(postId).subscribe(
      (response: any) => {
        this.postEntity = response;
        this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
      },
      error => { this.postService.HandError(error); });
  }

  deletePost(event, postId) {
    event.preventDefault();
    this.notificationService.confirmationDeleteDialog(
      this.translateService.instant('Common.MessageDelete'), () =>
        this.onDeletePost(postId));
  }

  savePost(event) {
    if (this.isNew) {
      delete event.Id;
      this.postService.Post(event)
        .subscribe(
          (response) => {
            this.postEntity = undefined;
            this.modalRef.hide();
            this.errors = [];
            this.setPage({ offset: 0 });
          },
          (responseErrors: any) => {
            if (responseErrors.status === 400 && responseErrors.error) {
              this.errors = responseErrors.error;
            } else {
              this.postService.HandError(responseErrors);
            }
          }
        );
    } else {
      this.postService.Put(event)
        .subscribe(
          (response) => {
            this.postEntity = undefined;
            this.modalRef.hide();
            this.errors = [];
            this.setPage({ offset: 0 });
          },
          (responseErrors: any) => {
            if (responseErrors.status === 400 && responseErrors.error) {
              this.errors = responseErrors.error;
            } else {
              this.postService.HandError(responseErrors);
            }
          });
    }
  }

  cancelPost(event) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.postEntity = undefined;
  }

  previewPost(event, postId, template: TemplateRef<any>) {
    event.preventDefault();
    this.isNew = false;
    this.errors = [];
    this.postEntity = new PostViewModel();
    this.postService.GetById(postId).subscribe(
      (response: any) => {
        this.postEntity = response;
        this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
      },
      error => { this.postService.HandError(error); });
  }
  onDeletePost(postId) {
    this.postService.Delete(postId)
      .subscribe((response) => {
        this.notificationService.printSuccessMessage(this.translateService.instant('Common.MessageDeleteSuccess'));
        this.searchPost({});
      }, (error) => {
        this.notificationService.printErrorMessage(this.translateService.instant('Common.MessageDeleteError'));
      });
  }
}
