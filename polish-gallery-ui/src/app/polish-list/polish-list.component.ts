// external
import { Component, OnInit } from '@angular/core';

// services
import { PolishService } from '../polish.service';

// components
import { TagsComponent } from '../tags/tags.component';

// models
import { PolishModel } from 'models/polish';


@Component({
  selector: 'app-polish-list',
  templateUrl: './polish-list.component.html',
  styleUrls: ['./polish-list.component.css']
})
export class PolishListComponent implements OnInit {
  polishes: PolishModel[];

  constructor(private polishService: PolishService) { }

  goToManufacturer(polish: PolishModel) {
    window.location.href = polish.manufacturerPageUrl;
  }

  ngOnInit() {
    this.polishService.getFeaturedPolish()
      .subscribe(
        (polishes) => {
          this.polishes = polishes;
        },
        (error) => {
          // todo error
        }
      );
  }
}
