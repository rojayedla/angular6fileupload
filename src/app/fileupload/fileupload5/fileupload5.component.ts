import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-fileupload5',
  templateUrl: './fileupload5.component.html',
  styleUrls: ['./fileupload5.component.css']
})
export class Fileupload5Component implements OnInit {

 
  title = 'helloworld';
   
  // fileData = null;
  constructor(private http: HttpClient) { }
 
  ngOnInit() {
     
   
  }
 
  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  // }
 
  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   this.http.post('url/to/your/api', formData, {
  //     reportProgress: true,
  //     observe: 'events'   
  //   })
  //   .subscribe(events => {
  //     if(events.type == HttpEventType.UploadProgress) {
  //         console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
  //     } else if(events.type === HttpEventType.Response) {
  //         console.log(events);
  //     }
  //   })
  // }

}
