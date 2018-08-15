import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { PostCategoryViewModel, IPostCategoryServiceToken, IPostCategoryService } from '../../../core';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { ValidationResponse } from '../../../core/models/error.model';

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
      this._entity = postCategory;
      this.addEditForm.reset(this._entity);
    } else {
      this._entity = undefined;
      this.addEditForm.reset();
    }
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  _entity: PostCategoryViewModel;
  public postCategorys: Array<PostCategoryViewModel> = [];
  private active = false;

  addEditForm: FormGroup = new FormGroup({
    Id: new FormControl(''),
    CategoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    CategoryDescription: new FormControl('', [Validators.maxLength(5000)]),
    IsPublic: new FormControl(false),
    ParentPostCategory: new FormControl(''),
    Url: new FormControl(''),
    MetaData: new FormControl(''),
    MetaDescription: new FormControl('')
  });

  constructor(@Inject(IPostCategoryServiceToken) private postCategoryService: IPostCategoryService) {
  }

  ngOnInit() {
    this.GetPostCategorys();
  }

  onSave(event) {
    event.preventDefault();
    if (this.addEditForm.valid) {
      this.save.emit(this.addEditForm.value);
    }
  }

  onCancel(event) {
    event.preventDefault();
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
}
