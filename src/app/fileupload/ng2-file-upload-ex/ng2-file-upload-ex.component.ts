import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-ng2-file-upload-ex',
  templateUrl: './ng2-file-upload-ex.component.html',
  styleUrls: ['./ng2-file-upload-ex.component.css']
})
export class Ng2FileUploadExComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
