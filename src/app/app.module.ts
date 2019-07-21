import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropDirective } from './fileupload/drag-drop.directive';
import { UploadFileComponent } from './fileupload/upload-file/upload-file.component';
import {MatCardModule, MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule} from '@angular/material';
import { FileuploadReuseComponent } from './fileupload/fileupload-reuse/fileupload-reuse.component';
import { HttpClientModule } from '@angular/common/http';
import { Fileupload3Component } from './fileupload/fileupload3/fileupload3.component';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { Fileupload5Component } from './fileupload/fileupload5/fileupload5.component';
import { Ng2FileUploadExComponent } from './fileupload/ng2-file-upload-ex/ng2-file-upload-ex.component';
import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  declarations: [
    AppComponent,
    DragDropDirective,
    UploadFileComponent,
    FileuploadReuseComponent,
    Fileupload3Component,
    Fileupload5Component,
    Ng2FileUploadExComponent  ],
  imports: [
    BrowserModule, NoopAnimationsModule,
    AppRoutingModule, MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  AngularFileUploaderModule, 
  FileUploadModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
