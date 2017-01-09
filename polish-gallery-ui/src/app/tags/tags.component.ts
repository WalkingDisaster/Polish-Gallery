import { Component, Input, OnInit } from '@angular/core';

import { Tag } from 'models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  @Input() name: string;
  @Input() tags: Tag[];

  constructor() { }
}
