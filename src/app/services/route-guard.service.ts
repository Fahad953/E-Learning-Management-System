import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackbarService: SnackbarService
  ) { }


  canActivate(router:ActivatedRouteSnapshot): boolean {
 
    let ecpectedRoleArray = router.data;
    ecpectedRoleArray = ecpectedRoleArray.expectedRole;
    console.log(ecpectedRoleArray,"kashiiiiiii")
    const token: any = localStorage.getItem('token');
    var tokenPayLoad: any;
    try{
      tokenPayLoad = jwt_decode(token);
    
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;
    for(let i = 0; i < ecpectedRoleArray.length; i++){
      console.log(tokenPayLoad.role,"a")

      localStorage.setItem('role', tokenPayLoad.role);
      if(ecpectedRoleArray[i] == tokenPayLoad.role){
        checkRole = true;
      }
    }
    if(tokenPayLoad.role == 'Admin' || tokenPayLoad.role == 'Student' || tokenPayLoad.role == 'Instructor'){
     if(this.auth.isAuthenticated() && checkRole){
      return true;
     }
     this.snackbarService.openSnackBar(GlobalConstants.unauthorized,GlobalConstants.error);
     this.router.navigate(['/cafe/dashboard']);
     return false;
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }

  
}
 
