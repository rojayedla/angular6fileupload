import { Component } from '@angular/core';
import { FileuploadService } from './fileupload/fileupload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fileuploadExample';

  errorMessage: string;
  images: Array<any>= [];





  
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI:  {
      url:"https://example-file-upload-api",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8"
      }
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    },
  };
  

  posturl: any;
  type: any;
  constructor(private fileService: FileuploadService) {
    this.posturl = 'https://example-file-upload-api';
    this.type = "filename";
    config: "pdf, image";

   }

  ngOnInit(){
    this.getImageData();
  }
  getImageData(){
    this.fileService.getImages().subscribe( (data:any) =>{ 
      this.images = data;
      console.log( this.images);
    },
      error => this.errorMessage = error
    )
  }

  refreshImages(status){
        if (status == true){
          console.log( "Uploaded successfully!");
          this.getImageData();
        }
}





}


//https://www.encodedna.com/angular/multiple-file-upload-in-angular-4-using-web-apiI-in-mvc-4.htm
//https://malcoded.com/posts/angular-file-upload-component-with-express/
//https://dzone.com/articles/file-upload-using-angular4microservice


//https://valor-software.com/ng2-file-upload/