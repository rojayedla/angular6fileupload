import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FileuploadService } from './fileupload.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  errors: Array<string> =[];
  dragAreaClass: string = 'dragarea';
@Input() projectId: number;
@Input() sectionId: number;
@Input() fileExt: string = "JPG, GIF, PNG";
@Input() maxFiles: number = 5;
@Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();
  public progress: number;
  public message: string;
  
constructor(private fileService: FileuploadService, private http: HttpClient) { }

ngOnInit() { }

onFileChange(event){
   let files = event.target.files; 
   this.saveFiles(files);
}

@HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
}

@HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
}

@HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
}

@HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
}
@HostListener('drop', ['$event']) onDrop(event) {   
    this.dragAreaClass = "dragarea";           
    event.preventDefault();
    event.stopPropagation();
    var files = event.dataTransfer.files;
    this.saveFiles(files);
}




// saveFiles(files){
//   this.errors = []; // Clear error
//   // Validate file size and allowed extensions
//   if (files.length > 0 && (!this.isValidFiles(files))) {
//       this.uploadStatus.emit(false);
//       return;
//   }  

//   let fileToUpload = <File>files[0];
// const formData = new FormData();
// formData.append('file', fileToUpload, fileToUpload.name);
 
//   if (files.length > 0) {
//         let formData: FormData = new FormData();
//         let fileToUpload = <File>files[0];
//       console.log(fileToUpload);
//         formData.append('file', fileToUpload, fileToUpload.name);
       
       
//         console.log(formData);

//         this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
// .subscribe(event => {
//   if (event.type === HttpEventType.UploadProgress)
//     this.progress = Math.round(100 * event.loaded / event.total);
//   else if (event.type === HttpEventType.Response) {
//     this.message = 'Upload success.';
//     this.uploadStatus.emit(event.body);
//   }

//         this.fileService.fileupload(formData)
//             .subscribe(
//             success => {
//               this.uploadStatus.emit(true);
//               console.log("success"+success)
//             },
//             error => {
//                 this.uploadStatus.emit(true);
//                 this.errors.push(error.ExceptionMessage);
//             }) ;
//     } ,
// }
// }

public saveFiles = (files) => {
  if (files.length === 0) {
    return;
  }

  let fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
console.log("aaaaaaa"+formData)
  this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.uploadStatus.emit(event.body);
      }
    });
}

private isValidFiles(files){
   // Check Number of files
    if (files.length > this.maxFiles) {
        this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
        return;
    }        
    this.isValidFileExtension(files);
    return this.errors.length === 0;
}

private isValidFileExtension(files){
    // Make array of file extensions
      var extensions = (this.fileExt.split(','))
                      .map(function (x) { return x.toLocaleUpperCase().trim() });

      for (var i = 0; i < files.length; i++) {
          // Get file extension
          var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
          // Check the extension exists
          var exists = extensions.includes(ext);
          if (!exists) {
              this.errors.push("Error (Extension): " + files[i].name);
          }
          // Check file size
          this.isValidFileSize(files[i]);
      }
}


private isValidFileSize(file) {
      var fileSizeinMB = file.size / (1024 * 1000);
      var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
      if (size > this.maxSize)
          this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
}
}
