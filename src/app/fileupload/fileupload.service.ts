import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  _baseURL: string = 'http://localhost:33699/api/fileupload/'
  constructor(private http: HttpClient) { }

  fileupload(files, parameters): Observable<any>{      
    let httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache'); 
    let options = {
      headers: httpHeaders
    };     
      return  this.http.post(this._baseURL + 'upload', files, options);
  }

  getImages(){
      return this.http.get(this._baseURL + "getimages") ;      
  }
 
}
