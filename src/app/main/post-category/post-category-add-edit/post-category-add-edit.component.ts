import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import {
  PostCategoryViewModel,
  IPostCategoryServiceToken,
  IPostCategoryService,
  ErrorHandle,
  IErrorServiceToken,
  IErrorService,
  FormError
} from '../../../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-category-add-edit',
  templateUrl: './post-category-add-edit.component.html',
  styleUrls: ['./post-category-add-edit.component.scss']
})
export class PostCategoryAddEditComponent implements OnInit {
  @Input() public isNew;

  @Input()
  public set postCategoryViewModel(postCategory: PostCategoryViewModel) {
    this.active = postCategory !== undefined || postCategory !== null;
    this._entity = new PostCategoryViewModel();
    if (this.active) {
      this.submittedAddEditForm = false;
      this._entity = postCategory;
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

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  _entity: PostCategoryViewModel;
  public postCategorys: Array<PostCategoryViewModel> = [];
  private active = false;
  private submittedAddEditForm = false;
  addEditForm: FormGroup = new FormGroup({
    Id: new FormControl(),
    CategoryName: new FormControl('', [Validators.required]),
    CategoryDescription: new FormControl('', [Validators.maxLength(5000)]),
    IsPublic: new FormControl(false),
    ParentPostCategory: new FormControl(''),
    Url: new FormControl(''),
    MetaData: new FormControl(''),
    MetaDescription: new FormControl(''),
    Posts: new FormControl([]),
    PostCategories: new FormControl([])
  });

  constructor(
    @Inject(IPostCategoryServiceToken) private postCategoryService: IPostCategoryService,
    @Inject(IErrorServiceToken) private errorService: IErrorService
  ) {
    errorService.setFormEdit(this.addEditForm);
  }

  ngOnInit() {
    this.GetPostCategorys();
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
  onCategoryChange(event) { }

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
