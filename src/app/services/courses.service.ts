import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url + '/courses/add/',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  update(data:any){
    return this.httpClient.patch(this.url + '/courses/update/',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getCourses(){
    return this.httpClient.get(this.url + '/courses/get/');
  }


  getStudentCourses(email:any){
    console.log(email,'s')
    return this.httpClient.post(this.url + '/courses/studentcontent/',email);
  }



  getContentwithCourseid(course_id:number){
    console.log(course_id,"aini");
    console.log(this.url +`/courses/getwithid/${course_id}`)
    return this.httpClient.get(this.url +`/courses/getwithid/${course_id}`);
  }



  enroll(data:any){
    console.log(data,'f')
    return this.httpClient.post(this.url + '/courses/enrol/',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }
}
