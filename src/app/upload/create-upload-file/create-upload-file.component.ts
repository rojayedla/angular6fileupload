import { Component, OnInit, EventEmitter, Input } from '@angular/core';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-create-upload-file',
  templateUrl: './create-upload-file.component.html',
  styleUrls: ['./create-upload-file.component.css']
})
export class CreateUploadFileComponent  {
 /*
  public uploader:FileUploader = new FileUploader({
    url: URL, 
    method: 'post',
    //disableMultipart:true,
    autoUpload: true,
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']
    });
    */

  // additionalParameters: { entityName: any; eventName: any; incidentId: any; };

   @Input() config: any;
   @Input() url: any = 'safety/incidentreports/uploadmedicaldoc';
   @Input() itemAlias: any;

   public uploader: FileUploader;
   public hasBaseDropZoneOver = false;
   public hasAnotherDropZoneOver = false;
   public description: any = '';
   public fileData: any = [];

   fileUpload(item) {
    //this.additionalParameters['description'] = this.description;
    item.upload();
  }

  fileObject: any;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e; 
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {  
    this.url = (this.url) ? this.url : 'safety/incidentreports/uploadmedicaldoc';
    this.url =  this.url;   
    this.uploader = new FileUploader({
      url: this.url,
     // additionalParameter: this.additionalParameters,
      headers: [{
        name: 'Authorization',
        value: "",
      }],
      itemAlias: this.itemAlias,
    });

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (response && response != null && response != undefined) {        
        const _remove = response.split("_");
        const fileName = _remove[_remove.length - 1];
        const extension = fileName.split('.').pop();
        const resTxt=response.split("/");
        
      }
    }
  }
}