// content-management.component.ts

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContentService } from 'src/app/services/content.service';
import { CoursesService } from 'src/app/services/courses.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {
  newContent: any = {};
  formData = new FormData();
  contents: any[] = [];
  dataSource!: MatTableDataSource<unknown>;
  responseMessage: any;
  snackbarService: any;
  data:any;
  constructor(private contentService: ContentService,     private coursesService: CoursesService,
    private snackBar: MatSnackBar) {
    this.data=[];
  
   }

  ngOnInit(): void {
    // Fetch existing content on component initialization
    this.getContents();
    this.tableData();
  }

  addContent() {
  
   console.log(this.newContent, "dame" , this.formData)


    this.contentService.addContent(this.formData,this.newContent).subscribe((response) => {
      console.log(response);
      // Reset the form and fetch updated content list
      this.newContent = {};
      this.getContents();
      this.newContent={};
      this.selectedVideoName='';
      this.selectedPdfName='';
      this.selectedImageName= '';
    });

  
  }
  selectedVideoName: string = '';
  selectedPdfName:string='';
  selectedImageName: string = '';

  selectedURLName:string = '';





  getContents() {

    // Call the service to get all content
    this.contentService.getAllContents().subscribe((response: any[]) => {
      this.contents = response;
      console.log(`Add content:`, this.contents);
    });
  }


  tableData(){
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




  viewContent(content: any) {
    console.log(`View content:`, content);
    // Implement view content functionality here
  }

  editContent(content: any) {
    console.log(`Edit content:`, content);
    // Implement edit content functionality here
  }

  // deleteContent(content: any) {
  //   const contentId = content.id;
  
  //   this.contentService.deleteContent(content).subscribe(
  //     (response: any) => {
  //       this.responseMessage = response?.message;
  //       console.log(this.responseMessage);
  //       this.openSnackBar(this.responseMessage, 'Close');
  //       content.isDeleted = true; // Mark the content as deleted
  //       this.tableData();
  //     },
  //     (error) => {
  //       if (error.error?.message) {
  //         this.responseMessage = error.error?.message;
  //       } else {
  //         this.responseMessage = GlobalConstants.genericError;
  //       }
  //       this.openSnackBar(this.responseMessage, 'Close');
  //     }
  //   );
  // }

  deleteContent(content: any) {
    const courseIdToDelete = content.id;
    this.contents = this.contents.filter(item => item.id !== courseIdToDelete);
  
    this.contentService.deleteContent(content).subscribe(
      (response: any) => {
        this.responseMessage = response?.message;
        console.log(this.responseMessage);
        this.openSnackBar(this.responseMessage, 'Close');
  
        // Remove the object from the contents array based on courseId
     
        this.tableData();
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.openSnackBar(this.responseMessage, 'Close');
      }
    );
  }
  



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // You can adjust the duration as needed
    });
  }


  getIconForType(contentType: string): string {
    switch(contentType) {
      case 'video':
        return 'ondemand_video';
      case 'pdf':
        return 'picture_as_pdf';
      case 'image':
        return 'image';
      case 'link':
        return 'link';
        case 'url':
          return 'url';
      default:
        return '';
    }
    
  }
 
  
  fileSizeError: boolean = false;

  onFileSelected(event: any, fileType: string) {
    let file = event.target.files[0];
   
    if (file) {
      if (this.validateFileSize(file, 100)) {
        switch (fileType) {
          case 'image':
            this.selectedImageName = file.name;
            break;
          case 'video':
            this.selectedVideoName = file.name;
            break;
          case 'pdf':
            this.selectedPdfName = file.name;
            break;
            case 'pdf':
              this.selectedURLName = file.url;
              break;
          default:
            break;
        }
        console.log('Selected file:', file.name);
        this.fileSizeError = false;
      } else {
        this.fileSizeError = true;
        console.error('File size exceeds the limit (500 MB).');
        this.openSnackBar('file size should be upto 500 MB', 'Close');
        this.newContent={};
        this.selectedVideoName='';
        this.selectedPdfName='';
        this.selectedImageName= '';
        this.newContent = {};

        return;
      }
    }
  
    this.uploadFile(file);
  }
  
  validateFileSize(file: File, maxSizeInMB: number): boolean {
    const fileSizeInMB = file.size / (1024 * 1024);
    if(fileSizeInMB <= maxSizeInMB){
    this.openSnackBar('file size should be upto 500 MB', 'Close');
    //  = '';
    }
  return fileSizeInMB <= maxSizeInMB
    
  }
  
  uploadFile(file: File) {
    if (!file) {
      console.error('No file selected for upload.');
      return;
    }
  
    if (!this.fileSizeError) {
      this.formData.append('file', file);
  
      this.formData.forEach((value, key) => {
        console.log('Key:', key, 'Value:', value);
      });
    }
  }
  


}
