import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import {
  IPostCategoryServiceToken,
  IPostCategoryService,
  PostCategoryViewModel,
  PageViewModel,
  ConfigService,
  ErrorHandle
} from '../../core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
  postCategoryEntity: PostCategoryViewModel;
  postCategorys: Array<PostCategoryViewModel>;
  page: PageViewModel;
  keyword: string;
  modalRef: BsModalRef;
  isNew = true;
  public errors: ErrorHandle[] = [];
  constructor(
    @Inject(IPostCategoryServiceToken) private postCategoryService: IPostCategoryService,
    private configService: ConfigService,
    private modalService: BsModalService) {
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
    }), error => {
      this.postCategoryService.HandError(error);
    });
  }

  addPostCategory(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.errors = [];
    this.isNew = true;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
    this.postCategoryEntity = new PostCategoryViewModel();
  }
  editPostCategory(event, postId, template: TemplateRef<any>) {
    event.preventDefault();
    this.isNew = false;
    this.errors = [];
    this.postCategoryEntity = new PostCategoryViewModel();
    this.postCategoryService.GetById(postId).subscribe(
      (response: any) => {
        this.postCategoryEntity = response;
        this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
      },
      error => { this.postCategoryService.HandError(error); });
  }

  deletePostCategory(event, postId) {

  }

  savePostCategory(event: PostCategoryViewModel) {
    if (this.isNew) {
      delete event.Id;
      this.postCategoryService.Post(event)
        .subscribe(
          (response) => {
            this.postCategoryEntity = undefined;
            this.modalRef.hide();
            this.errors = [];
            this.setPage({ offset: 0 });
          },
          (responseErrors: any) => {
            if (responseErrors.status === 400 && responseErrors.error) {
              this.errors = responseErrors.error;
            } else {
              this.postCategoryService.HandError(responseErrors);
            }
          }
        );
    } else {
      this.postCategoryService.Put(event)
        .subscribe(
          (response) => {
            this.postCategoryEntity = undefined;
            this.modalRef.hide();
            this.errors = [];
            this.setPage({ offset: 0 });
          },
          (responseErrors: any) => {
            if (responseErrors.status === 400 && responseErrors.error) {
              this.errors = responseErrors.error;
            } else {
              this.postCategoryService.HandError(responseErrors);
            }
          });
    }
  }
  cancelPostCategory() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.postCategoryEntity = undefined;
  }
}
