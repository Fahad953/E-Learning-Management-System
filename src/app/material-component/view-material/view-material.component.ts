import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.scss']
})
export class ViewMaterialComponent implements OnInit {
  contentService: any;
  contents: any[] = [];
  data: any;
  responseMessage: any;
  snackbarService: any;
  storedEmail : any;
  storedrole:any;

  constructor( private coursesService: CoursesService,   private router: Router,) { }

  ngOnInit(): void {
    this.tableData();
     this.storedEmail = localStorage.getItem('email');
     this.storedrole = localStorage.getItem('role');
     console.log(this.storedEmail)
  }
  // getContents() {

  //   // Call the service to get all content
  //   this.contentService.getAllContents().subscribe((response: any[]) => {
  //     this.contents = response;
  //     console.log(`Add content:`, this.contents);
  //   });
  // }


  tableData(){


    if(localStorage.getItem('role')=='Student'){

console.log("g")
      this.coursesService.getStudentCourses({'email':localStorage.getItem('email') }).subscribe((response:any)=>{
      
        this.data=response;
        console.log(this.data,"kashi")
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  }

    else{
          
    this.coursesService.getCourses().subscribe((response:any)=>{
      
      this.data=response;
      console.log(this.data,"kashi")
  },(error:any)=>{
    console.log(error);
    if(error.error?.message){
      this.responseMessage = error.error?.message;
    }
    else{
      this.responseMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  });
}
}

viewCourseContent(id:any){
  this.router.navigate(['/cafe/view-mat',id]);
}
}
