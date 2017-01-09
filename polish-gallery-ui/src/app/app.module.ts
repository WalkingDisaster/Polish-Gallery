import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PolishListComponent } from './polish-list/polish-list.component';
import { PolishService } from './polish.service';

import 'hammerjs';

import { TagsComponent } from './tags/tags.component';
import { AddPolishComponent } from './add-polish/add-polish.component';

@NgModule({
  declarations: [
    AppComponent,
    PolishListComponent,
    TagsComponent,
    ImageCropperComponent,
    AddPolishComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [PolishService],
  bootstrap: [AppComponent]
})
export class PolishGalleryAppModule { }
