import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { PostCategoryViewModel } from '../../../core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-category-add-edit',
  templateUrl: './post-category-add-edit.component.html',
  styleUrls: ['./post-category-add-edit.component.scss']
})
export class PostCategoryAddEditComponent implements OnInit {
  @Input() public isNew;

  @Input()
  public set postCategoryViewModel(postCategory: PostCategoryViewModel) {
    this.active = postCategory !== undefined;
    this.entity = new PostCategoryViewModel();
    if (this.active) {
      this.entity = postCategory;

    } else {
      this.entity = undefined;
    }
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  entity: PostCategoryViewModel;
  private active = false;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

}
