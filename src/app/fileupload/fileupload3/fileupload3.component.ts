import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fileupload3',
  templateUrl: './fileupload3.component.html',
  styleUrls: ['./fileupload3.component.css']
})
export class Fileupload3Component implements OnInit {

  constructor (private httpService: HttpClient) {  }

  myFiles:string [] = [];
  sMsg:string = '';

  ngOnInit () {  }

  getFileDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) { 
      frmData.append("fileUpload", this.myFiles[i]);
    }
    
    this.httpService.post('http://localhost:60505/api/fileupload/', frmData).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.sMsg = data as string;
        console.log (this.sMsg);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);    // Show error, if any.
      }
    );
  }
}