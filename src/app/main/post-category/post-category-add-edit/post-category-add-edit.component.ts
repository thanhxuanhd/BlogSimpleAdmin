import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { PostCategoryViewModel } from '../../../core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
    } else {
      this._entity = undefined;
    }
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  _entity: PostCategoryViewModel;
  private active = false;

  addEditForm: FormGroup = new FormGroup({
    Id: new FormControl(''),
    CategoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    CategoryDescription: new FormControl('', [Validators.maxLength(5000)]),
    IsPublic: new FormControl(false),
    ParentPostCategory: new FormControl(null),
    Url: new FormControl(''),
    MetaData: new FormControl(''),
    MetaDescription: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() { }

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
}
