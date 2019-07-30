import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';
@Component({
  selector: 'app-file-upload2',
  templateUrl: './file-upload2.component.html',
  styleUrls: ['./file-upload2.component.css']
})
export class FileUpload2Component implements OnInit {
  public uploader: FileUploader; 
  errors: Array<string> =[];
  maxSize: number = 2;
  public hasAnotherDropZoneOver:boolean = false;
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor() { }


  ngOnInit() {

   this.uploader = new FileUploader(
     {url: URL, 
      itemAlias: 'file',
     // fileSize: 1, 
      headers : [{name: "", value: ""},
      {name: "Content-Type", value: ""}]
    
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
 }
 private isValidFileSize(file) {
  var fileSizeinMB = file.size / (1024 * 1000);
  var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
  if (size > this.maxSize)
      this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
}
}
