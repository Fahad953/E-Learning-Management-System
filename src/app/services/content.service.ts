// content.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addContent(file: FormData,content: any): Observable<any> {
    // return this.http.post<any>(`${this.url}/courseContent/add`, content);
  console.log(content.url,'f')

  if(content.url){
    return this.http.post(`${this.url}/upload/uploadURL/${content.course_id}/${content.content_type}/${content.contentTitle}`,content);
  }
  else
    return this.http.post(`${this.url}/upload/uploadFile/${content.course_id}/${content.content_type}/${content.contentTitle}`, file);

  }

  getAllContents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/courseContent/get`);
  }

  deleteContent(content:any): Observable<any> {
    const url = `${this.url}/upload/deleteFile/`;
    return this.http.post(url,content);
  }




  viewContent(link:any){
    return this.http.post(`${this.url}/upload/viewFile/`, { path: link }
    , {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
  });
  }

  
  downloadContent(link:any): Observable<any> {
    console.log(link,"g")
    // const url = `${this.url}/upload/downloadFile/`;
    // return this.http.post(`${this.url}/upload/downloadFile/`,link);
    return this.http.post(`${this.url}/upload/downloadFile/`, { path: link }, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
  });
  }


  getContentswithid(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/courseContent/get`);
  }

}
