import { Component, OnInit, Inject } from '@angular/core';
import { IAuthenServiceToken, IAuthenService, UrlConfig, NotificationService } from '../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({
    UserName: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });


  constructor(
    @Inject(IAuthenServiceToken) private authenService: IAuthenService,
    private router: Router,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit() {
  }

  onFormLoginSubmit(event) {
    event.preventDefault();
    if (this.formLogin.valid) {
      this.authenService.Login(this.formLogin.value).subscribe((response) => {
        this.router.navigate([UrlConfig.MAIN]);
        this.notificationService.printSuccessMessage('Login Success');
      }, error => {
        this.router.navigate([UrlConfig.LOGIN]);
        this.notificationService.printErrorMessage('Login Error');
      });
    }
  }
}
