import { Component, OnInit } from '@angular/core';
// import { FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/global-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private userService : UserService,
    ) { }
  signupForm: any = FormGroup;
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],      
    })

  }


  handleSubmit(){    


    this.userService.AddNewTeacher(this.signupForm.value).subscribe((response:any)=>{
      console.log(response)
      if(response.status==201){
        this.snackbarService.openSnackBar("Teacher Created","sucess");  
      }
      else if
      (response.status==200){
        this.snackbarService.openSnackBar("Teacher Already Exists",GlobalConstants.error);  
      }

    },(error:any)=>{
      console.log(error);      
      this.snackbarService.openSnackBar("An Error Occured",GlobalConstants.error);
    });



    // AddNewTeacher
    
  }

}
