import { Component, OnInit, Inject } from '@angular/core';
import { IAuthenServiceToken, IAuthenService, UrlConfig, NotificationService, TranslatesService, SystemConfig } from '../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Jsonp } from '@angular/http';
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
    private notificationService: NotificationService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private translatesService: TranslatesService
  ) {
    this
      .router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
      });
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

  setLanguage(lang) {
    localStorage.setItem(SystemConfig.LANG, JSON.stringify(lang));
    this.translatesService.use(lang);
    this.translatesService.refreshText();
  }
}
