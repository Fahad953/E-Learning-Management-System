import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;
  constructor(private formBuilder: FormBuilder,
    private router : Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackbarService: SnackbarService) { 
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit(){
    var formData = this.loginForm.value;
    var data = {
      email:formData.email,
      password:formData.password
    }
    this.userService.login(data).subscribe(
      (response:any)=>{
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        // Inside your login component's success callback
localStorage.setItem('email', formData.email); // Store the email in local storage

this.router.navigate(['/cafe/dashboard']);

        this.router.navigate(['/cafe/dashboard']);
      },(error) =>{
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      }   
    )
  }

}
