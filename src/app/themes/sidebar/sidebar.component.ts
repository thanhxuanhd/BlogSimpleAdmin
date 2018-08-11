import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import {
    IAuthenServiceToken,
    IAuthenService,
    UrlConfig,
    NotificationService,
    LoggedInUser
} from '../../core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements AfterViewInit {
    constructor(@Inject(IAuthenServiceToken) private authenService: IAuthenService,
        private router: Router,
        private notificationService: NotificationService) {
        this.currentUser = this.authenService.GetCurrentUser();
    }

    // this is for the open close
    isActive = true;
    showMenu = '';
    showSubMenu = '';
    currentUser: LoggedInUser;
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
        } else {
            this.showSubMenu = element;
        }
    }
    eventCalled() {
        this.isActive = !this.isActive;

    }
    // End open close
    ngAfterViewInit() {
        $(function () {

            $('.sidebartoggler').on('click', function () {
                if ($('body').hasClass('mini-sidebar')) {
                    $('body').trigger('resize');
                    $('.scroll-sidebar, .slimScrollDiv').css('overflow', 'hidden').parent().css('overflow', 'visible');
                    $('body').removeClass('mini-sidebar');
                    $('.navbar-brand span').show();

                } else {
                    $('body').trigger('resize');
                    $('.scroll-sidebar, .slimScrollDiv').css('overflow-x', 'visible').parent().css('overflow', 'visible');
                    $('body').addClass('mini-sidebar');
                    $('.navbar-brand span').hide();
                }
            });

        });
    }

    logoutPage(event) {
        this.authenService.Logout().subscribe((response) => {
            this.router.navigate([UrlConfig.LOGIN]);
            this.notificationService.printSuccessMessage('Success');
        }, (error) => {
            this.router.navigate([UrlConfig.LOGIN]);
            this.notificationService.printErrorMessage('Fail');
        });
    }
}
