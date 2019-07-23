import { Component, OnInit } from '@angular/core';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';

import { concat } from 'rxjs';
import { UploadService } from '../upload.service';

const URL = 'http://127.0.0.1:8000';
@Component({
  selector: 'app-create-file-upload1',
  templateUrl: './create-file-upload1.component.html',
  styleUrls: ['./create-file-upload1.component.css']
})
export class CreateFileUpload1Component implements OnInit {


  title = 'fileupload';
  public uploader: FileUploader = new FileUploader({
    url: URL,
    maxFileSize: 1024 * 1024 * 1,
    headers: [{
      name: "",
      value: ""
    }]
  });

  public hasBaseDropZoneOver: boolean = false;
  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }
  constructor(private uploadService: UploadService) { }
  ngOnInit() { }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  submitFile() {
    let files = this.getFiles();
    let requests = [];
    files.forEach((file) => {
      let formData = new FormData();
      formData.append('file', file.rawFile, file.name);
      requests.push(this.uploadService.upload(formData));
    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
