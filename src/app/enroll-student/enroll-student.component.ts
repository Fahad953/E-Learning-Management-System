import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { CoursesService } from 'src/app/services/courses.service';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.scss']
})
export class EnrollStudentComponent implements OnInit {
  dataSource: any;
  responseMessage: any;
 
  data: any;
  d: any;
  selectedRollNumber: any; // Variable to store the selected roll number
  studentName: any; // Variable to store the selected student's name
  studentEmail:any;
  studentPhoneNumber:any;
  selectedEnrollment: any;
  constructor(
    private userService: UserService,
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private snackbarService: SnackbarService   ) {}

  ngOnInit(): void {
    this.allStudents();
    this.tableData();
  }

  allStudents() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.d = response; // Update d with the student data
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  tableData() {
    this.coursesService.getCourses().subscribe(
      (response: any) => {
        this.data = response; // Update data with course data
        console.log(this.data, 'kashi');
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  onRollNumberSelected(): void {
    
    console.log(this.selectedRollNumber,'d')
    if (this.selectedRollNumber) {
      const selectedStudent = this.d.find((student: any) => student.id == this.selectedRollNumber);
      this.studentName = selectedStudent ? selectedStudent.name : null;
      this.studentEmail = selectedStudent ? selectedStudent.email : null;
      this.studentPhoneNumber = selectedStudent ? selectedStudent.contactNumber : null;
      console.log(selectedStudent);
    } else {
      this.studentName = null;
    }

    // Manually trigger change detection
    this.cd.detectChanges();
  }


  onSubmit(): void {
    if (this.selectedRollNumber && this.selectedEnrollment) {
      const selectedStudent = this.d.find((student: any) => student.id == this.selectedRollNumber);
      const selectedEnrollment = {
        st_nm :selectedStudent.name,
        st_rn: selectedStudent.id,
        c_id: this.selectedEnrollment[0][0]
      };
  
      console.log('Selected Student:', selectedEnrollment);
      this.coursesService.enroll(selectedEnrollment).subscribe(
        (response: any) => {
          // this.data = response; // Update data with course data
          console.log(this.data, 'kashi');
          this.responseMessage = response?.message;
          this.snackbarService.openSnackBar(this.responseMessage,"Success");
        },
        (error: any) => {
          console.log(error);
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
  
}
