
import { Injectable } from '@angular/core';

//import {Observable} from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

   
   
  _baseURL: string = 'http://localhost:33699/api/fileupload/'
  constructor(private http: HttpClient) { }

  fileupload(files): Observable<any>{      
    console.log("files----------"+files);
    let httpHeaders = new HttpHeaders()
    .set('Content-Type', 'multipart/form-data')
    let options = {
      headers: httpHeaders
    };     
      return  this.http.post(this._baseURL + files, options);
  }

  getFiles(){
      return this.http.get(this._baseURL + "getimages") ;      
  }
}
// this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
// .subscribe(event => {
//   if (event.type === HttpEventType.UploadProgress)
//     this.progress = Math.round(100 * event.loaded / event.total);
//   else if (event.type === HttpEventType.Response) {
//     this.message = 'Upload success.';
//     this.onUploadFinished.emit(event.body);
//   }
//});