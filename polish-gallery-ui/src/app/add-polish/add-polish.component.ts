import { Component, OnInit, ViewChild } from '@angular/core';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

import {PolishService} from '../polish.service';

import {AddPolishModel} from './add-polish-model';

@Component({
  selector: 'app-add-polish',
  templateUrl: './add-polish.component.html',
  styleUrls: ['./add-polish.component.css']
})
export class AddPolishComponent implements OnInit {

  name: string;
  cropperSettings: CropperSettings;
  model: AddPolishModel;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private polishService: PolishService) {
    this.model = new AddPolishModel();
  }

  ngOnInit() {
    this.initializeCropper();
  }
  cropped(bounds: Bounds) {
    console.log(bounds);
  }

  fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let self = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      self.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  onSubmit() {
    this.polishService.addPolish(null).then(() => {
      // todo mnm things should happen
    })
    .catch(() => {
      // todo mnm errors
    });
  }

  private initializeCropper() {
    this.name = 'Huzaaa!';
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    // output size (destination file size)
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    // makes it a circle
    this.cropperSettings.rounded = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
  }

  get diagnostic() { return JSON.stringify(this.model); }
}
