import { Component } from '@angular/core';
import { TranslatesService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private translatesService: TranslatesService) {

  }
}
