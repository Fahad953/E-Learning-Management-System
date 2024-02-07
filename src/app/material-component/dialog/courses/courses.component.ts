import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EventEmitter } from '@angular/core';
import { GlobalConstants } from 'src/app/shared/global-constants';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  onAddCourse = new EventEmitter();
  onEditCourse = new EventEmitter();
  courseForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any; 
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
   private formBuilder: FormBuilder, 
   private courseService: CoursesService, 
   public dialogRef: MatDialogRef<CoursesComponent>,
   private snackbarService: SnackbarService ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit';
      this.action = 'Edit';
      this.courseForm.patchValue({
        name: this.dialogData.data.name
      })
    }   
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.courseForm.value;
    var data = {
      title: formData.name,
      description: formData.description
    }
    console.log(data);
    this.courseService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddCourse.emit();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"Success");
    },(error: any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit(){
    var formData = this.courseForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      description: formData.description
    }
    this.courseService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditCourse.emit();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"Success");
    },(error: any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
