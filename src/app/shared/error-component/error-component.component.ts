import { Component, OnInit, Input } from '@angular/core';
import { FormError } from '../../core';

@Component({
  selector: 'app-error',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() errors: FormError[];
  @Input() viewName: string;
  constructor() { }

  ngOnInit() {
    console.log(this.errors);
  }

}
