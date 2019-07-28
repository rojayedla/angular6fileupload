import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../file-upload/fileupload.service';

@Component({
  selector: 'app-fileupload-section',
  templateUrl: './fileupload-section.component.html',
  styleUrls: ['./fileupload-section.component.css']
})
export class FileuploadSectionComponent implements OnInit {
constructor(private fileService: FileuploadService) {}
  ngOnInit(){
    this.getImageData();
  }
  getImageData(){
    this.fileService.getFiles().subscribe(
      
      data =>{ this.images = data},
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
