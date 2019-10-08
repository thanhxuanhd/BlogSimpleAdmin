import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import {
  UserViewModel,
  PageViewModel,
  ErrorHandle,
  ConfigService,
  INotificationService,
  TranslatesService,
  IUserServiceToken,
  INotificationServiceToken,
  IUserService
} from '../../core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userEntity: UserViewModel;
  users: Array<UserViewModel>;
  page: PageViewModel;
  keyword: string;
  modalRef: BsModalRef;
  isNew = true;
  public errors: ErrorHandle[] = [];
  constructor(
    @Inject(IUserServiceToken) private userService: IUserService,
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

  setPage(pageInfo) {
    this.page.PageIndex = pageInfo.offset;
    this.userService.Get(this.keyword, '', this.page.PageIndex, this.page.PageSize)
      .subscribe((response => {
        if (response) {
          this.users = response.Items;
          this.page.TotalCount = response.TotalCount;
        }
      }), error => {
        this.userService.HandError(error);
      });
  }

  searchUser(event: any) {
    this.setPage({ offset: 0 });
  }

  addUser(event: any, template: TemplateRef<any>) {
    event.preventDefault();
    this.errors = [];
    this.isNew = true;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
    this.userEntity = new UserViewModel();
  }

  editRole(event: any, userId: any, template: TemplateRef<any>) {
    event.preventDefault();
    this.isNew = false;
    this.errors = [];
    this.userEntity = new UserViewModel();
  }

  deleteUser(event: any, roleId: any) {
    event.preventDefault();
  }

  editUser(event: any, user: any) {
    event.preventDefault();
  }

}
