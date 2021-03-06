import { Component, OnInit, Input, EventEmitter, Output, HostListener, HostBinding } from '@angular/core';
import { FileuploadService } from '../fileupload.service';

//https://github.com/AliAdravi/Angular-4-upload-files-with-data-and-Web-API/tree/master/src

@Component({
  selector: 'app-fileupload-reuse',
  templateUrl: './fileupload-reuse.component.html',
  styleUrls: ['./fileupload-reuse.component.css']
})
export class FileuploadReuseComponent implements OnInit {

 errors: Array<string> =[];
     dragAreaClass: string = 'dragarea';
	  @Input() projectId: number;
	  @Input() sectionId: number;
	  @Input() fileExt: string = "JPG, GIF, PNG, PDF";
	  @Input() maxFiles: number = 5;
	  @Input() maxSize: number = 5; // 5MB
      @Output() uploadStatus = new EventEmitter();
      
    constructor(private fileService: FileuploadService) { }
    ngOnInit() { }

    onFileChange(event){
       let files = event.target.files; 
       this.saveFiles(files);
    }


@HostBinding('style.background-color') private background = '#f5fcff'
@HostBinding('style.opacity') private opacity = '1'
@Output() onFileDropped = new EventEmitter<any>();
    @HostListener('dragover', ['$event']) onDragOver(event) {
      event.preventDefault();
      event.stopPropagation();
      this.background = '#9ecbec';
      this.opacity = '0.8';
    }
    
    // @HostListener('dragenter', ['$event']) onDragEnter(event) {
    //     this.dragAreaClass = "droparea";
    //     event.preventDefault();
    // }

    // @HostListener('dragend', ['$event']) onDragEnd(event) {
    //     this.dragAreaClass = "dragarea";
    //     event.preventDefault();
    // }
    
   
    @HostListener('dragleave', ['$event']) onDragLeave(event) {
      event.preventDefault();
      event.stopPropagation();
      this.background = '#f5fcff'
      this.opacity = '1'
    }

    
    @HostListener('drop', ['$event']) onDrop(event) {   
        this.dragAreaClass = "dragarea";           
        event.preventDefault();
        event.stopPropagation();
        this.background = '#f5fcff'
        let files = event.dataTransfer.files;
        this.saveFiles(files); 
        this.opacity = '1'   
        if (files.length > 0) {
          this.onFileDropped.emit(files)
        }
    }


    saveFiles(files){
      this.errors = []; // Clear error
      // Validate file size and allowed extensions
      if (files.length > 0 && (!this.isValidFiles(files))) {
          this.uploadStatus.emit(false);
          return;
      }  
     
      if (files.length > 0) {
            let formData: FormData = new FormData();
            for (var j = 0; j < files.length; j++) {
                formData.append("file[]", files[j], files[j].name);
            }
            var parameters = {
                projectId: this.projectId,
                sectionId: this.sectionId
            }
            this.fileService.fileupload(formData, parameters)
                .subscribe(
                success => {
                  this.uploadStatus.emit(true);
                  console.log(success)
                },
                error => {
                    this.uploadStatus.emit(true);
                    this.errors.push(error.ExceptionMessage);
                }) 
        } 
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