import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {

   }

   signup(data:any){
    return this.httpClient.post(this.url + '/user/signup',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }


  forgotPassword(data:any){
    return this.httpClient.post(this.url + '/user/forgotPassword',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data:any){
    return this.httpClient.post(this.url + '/user/login',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken(){
   return this.httpClient.get(this.url + '/user/checkToken',{
     headers: new HttpHeaders().set('Content-Type', 'application/json')
   }) 
  }


  changePassword(data:any){
   return this.httpClient.post(this.url + '/user/changePassword',data,{
     headers: new HttpHeaders().set('Content-Type', 'application/json')   
   }) 
  }

  update(data:any){
    console.log(data,"Update")    
    return this.httpClient.patch(this.url + '/user/update',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')     
    })
  }

  AddNewTeacher(data:any){
    return this.httpClient.post(this.url + '/user/AddNewTeacher',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getUsers() {
    return this.httpClient.get(this.url + '/user/getUsers',{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
