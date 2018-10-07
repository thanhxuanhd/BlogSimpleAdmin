import { Component, OnInit, Inject } from '@angular/core';
import {
  IAuthenServiceToken,
  IAuthenService,
  UrlConfig,
  TranslatesService,
  SystemConfig,
  Language,
  ConfigService,
  IErrorServiceToken,
  IErrorService,
  INotificationService,
  FormError,
  INotificationServiceToken
} from '../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({
    UserName: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  });

  languages: Array<Language> = [];
  currentLanguage: Language;
  private submittedLoginForm = false;
  constructor(
    @Inject(IAuthenServiceToken) private authenService: IAuthenService,
    private router: Router,
    @Inject(INotificationServiceToken) private notificationService: INotificationService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private translatesService: TranslatesService,
    private configuration: ConfigService,
    @Inject(IErrorServiceToken) private errorService: IErrorService) {
    this
      .router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        mergeMap(route => route.data)
      ).subscribe((event) => {
        this.titleService.setTitle(event['title']);
      });

    this.languages = this.configuration.getConfiguration().LAGUAGE.Languages;
    const lang = translatesService.currentLanguage();
    if (lang) {
      this.currentLanguage = this.languages.find(f => f.Id === lang);
    }
    this.errorService.setFormEdit(this.formLogin);
  }

  ngOnInit() {
  }

  onFormLoginSubmit(event) {
    event.preventDefault();
    if (this.formLogin.valid) {
      this.submittedLoginForm = true;
      this.authenService.Login(this.formLogin.value).subscribe((response) => {
        this.router.navigate([UrlConfig.MAIN]);
        this.notificationService.printSuccessMessage(this.translatesService.instant('Login.LoginSuccess'));
      }, reponseError => {
        if (reponseError.status === 400 && reponseError.error) {
          const errors = reponseError.error;
          errors.forEach(error => {
            if (error.Validations && error.Validations.length > 0) {
              const control = this.errorService.findFieldControl(error.Key);
              const errorsValue = this.errorService.fetchFieldErrors(error.Validations);
              control.setErrors(errorsValue);
            }
          });
        } else {
          this.authenService.HandError(reponseError);
        }
        this.router.navigate([UrlConfig.LOGIN]);
        this.notificationService.printErrorMessage(this.translatesService.instant('Login.LoginError'));
        this.submittedLoginForm = false;
      });
    }
  }

  setLanguage(lang) {
    localStorage.setItem(SystemConfig.LANG, JSON.stringify(lang));
    this.translatesService.use(lang);
    this.currentLanguage = this.languages.find(f => f.Id === lang);
    this.translatesService.refreshText();
  }

  public fieldErrors(name: string): FormError[] {
    const control = this.errorService.findFieldControl(name);
    if (control && (control.touched || this.submittedLoginForm) && control.errors) {
      return this.errorService.getErrors(control, name);
    } else {
      return undefined;
    }
  }
}
