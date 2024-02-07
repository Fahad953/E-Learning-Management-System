import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CoursesComponent } from '../dialog/courses/courses.component';


@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})
export class ManageCoursesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description','edit'];
  dataSource: any;
  responseMessage: any;
  constructor(
    private coursesService: CoursesService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.coursesService.getCourses().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
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

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "550px";
    const dialogRef = this.dialog.open(CoursesComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCourse.subscribe((response)=>{
      this.tableData();
    })
 }

 handleEditAction(values:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    action: 'Edit',
    data: values
  };
  console.log(values);
  dialogConfig.width = "550px";
  const dialogRef = this.dialog.open(CoursesComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  });
  const sub = dialogRef.componentInstance.onAddCourse.subscribe((response)=>{
    this.tableData();
  })
 }
}
