import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {
  PostViewModel,
  IErrorServiceToken,
  IErrorService,
  IPostCategoryService,
  IPostCategoryServiceToken,
  PostCategoryViewModel,
  FormError,
  ErrorHandle
} from '../../../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-add-edit',
  templateUrl: './post-add-edit.component.html',
  styleUrls: ['./post-add-edit.component.scss']
})
export class PostAddEditComponent implements OnInit {

  @Input() public isNew;
  @Input()
  public set postViewModel(post: PostViewModel) {
    this.active = post !== undefined || post !== null;
    this._entity = new PostViewModel();
    if (this.active) {
      this.submittedAddEditForm = false;
      this._entity = post;
      this.addEditForm.reset(this._entity);
    } else {
      this._entity = undefined;
      this.addEditForm.reset();
    }
  }
  @Input()
  public set errors(errors: ErrorHandle[]) {
    if (errors && errors.length > 0) {
      errors.forEach(error => {
        if (error.Validations && error.Validations.length > 0) {
          const control = this.errorService.findFieldControl(error.Key);
          const errorsValue = this.errorService.fetchFieldErrors(error.Validations);
          control.setErrors(errorsValue);
        }
      });
    }
  }

  private active = false;
  private submittedAddEditForm = false;
  public postCategorys: Array<PostCategoryViewModel> = [];
  confitTypTinyMCE = {
    plugins: 'link',
    height: '300'
  };
  _entity: PostViewModel;
  addEditForm: FormGroup = new FormGroup({
    Id: new FormControl(),
    Title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Content: new FormControl(''),
    PostCategoryId: new FormControl('', [Validators.required]),
    IsPublic: new FormControl(false),
    Url: new FormControl('', [Validators.maxLength(2000)]),
    MetaData: new FormControl(''),
    MetaDescription: new FormControl(),
    Comments: new FormControl([])
  });

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(IPostCategoryServiceToken) private postCategoryService: IPostCategoryService,
    @Inject(IErrorServiceToken) private errorService: IErrorService
  ) {
    this.errorService.setFormEdit(this.addEditForm);
    this.GetPostCategorys();
  }

  ngOnInit() {
  }

  onSave(event) {
    event.preventDefault();
    if (this.addEditForm.valid) {
      this.submittedAddEditForm = true;
      this.save.emit(this.addEditForm.value);
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.submittedAddEditForm = false;
    this._entity = undefined;
    this.active = false;
    this.cancel.emit();
  }

  private GetPostCategorys() {
    this.postCategoryService.GetAll()
      .subscribe((response => {
        if (response) {
          this.postCategorys = response as Array<PostCategoryViewModel>;
        }
      }
      ), error => {
        this.postCategorys = [];
        this.postCategoryService.HandError(error);
      });
  }

  IsHasError(controlName) {
    return this.addEditForm.controls[controlName].invalid;
  }

  public fieldErrors(name: string): FormError[] {
    const control = this.errorService.findFieldControl(name);
    if (control && (control.touched || this.submittedAddEditForm) && control.errors) {
      return this.errorService.getErrors(control, name);
    } else {
      return undefined;
    }
  }

}
