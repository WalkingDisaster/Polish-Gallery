import { Component } from '@angular/core';

import { environment } from 'environments/environment';
import { PolishListComponent } from './polish-list/polish-list.component';
import { PolishService } from './polish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    'h1 span.environment { background-color: ' + environment.envColor + ' }'
  ]
})
export class AppComponent {
  title = 'app works!';
  env = environment.envName;

  constructor(private polishService: PolishService) { }

  onInitializeDatabase() {
    console.log('Re-initializing the database.');
    this.polishService.initializeDatabase().then(() => {
      console.log('The database has been re-initialized.');
    });
  }
}
