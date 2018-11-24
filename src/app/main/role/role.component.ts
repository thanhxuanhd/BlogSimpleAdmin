import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import {
  RoleViewModel,
  PageViewModel,
  ErrorHandle, INotificationService,
  INotificationServiceToken,
  TranslatesService,
  IRoleServiceToken,
  ConfigService,
  IRoleService
} from '../../core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleEntity: RoleViewModel;
  roles: Array<RoleViewModel>;
  page: PageViewModel;
  keyword: string;
  modalRef: BsModalRef;
  isNew = true;
  public errors: ErrorHandle[] = [];
  constructor(
    @Inject(IRoleServiceToken) private roleService: IRoleService,
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
    this.roleService.Get(this.keyword, '', this.page.PageIndex, this.page.PageSize)
      .subscribe((response => {
        if (response) {
          this.roles = response.Items;
          this.page.TotalCount = response.TotalCount;
        }
      }), error => {
        this.roleService.HandError(error);
      });
  }

  searchRole(event) {
    this.setPage({ offset: 0 });
  }

  addRole(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.errors = [];
    this.isNew = true;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
    this.roleEntity = new RoleViewModel();
  }

  editRole(event, roleId, template: TemplateRef<any>) {
    event.preventDefault();
    this.isNew = false;
    this.errors = [];
    this.roleEntity = new RoleViewModel();
  }

  deleteRole(event, roleId) {
    event.preventDefault();
  }

}
