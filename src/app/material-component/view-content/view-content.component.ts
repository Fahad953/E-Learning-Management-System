import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { CoursesService } from 'src/app/services/courses.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
; // Import MatDialog
// import { ContentViewDialogComponent } from '../content-view-dialog/content-view-dialog.component'; // Import your ContentViewDialogComponent
import { saveAs } from 'file-saver';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { VideoViewerDialogComponent } from '../video-viewer-dialog/video-viewer-dialog.component';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';
@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit {
  data: any;
  responseMessage: any;
  course_id: any;
  pdfContent: any;
  videoContent: any;
  imageContent: any;
  urlContent:any;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private contentService: ContentService,
    private dialog: MatDialog // Add MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course_id = params['id']; // Access the 'id' parameter
    });

    this.getContent();
  }

  getContent() {
    this.coursesService.getContentwithCourseid(this.course_id).subscribe(
      (response: any) => {
        this.data = response;
        this.pdfContent = this.data.filter((item: any) => item.content_type === 'pdf');
        this.videoContent = this.data.filter((item: any) => item.content_type === 'video');
        this.imageContent = this.data.filter((item: any) => item.content_type === 'image');
        this.urlContent = this.data.filter((item: any) => item.content_type === 'link');
        console.log(this.data, 'k');
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
      }
    );
  }


viewContent(ContentUrl:any){
  this.contentService.viewContent(ContentUrl).subscribe(
    (success) => {
      console.log(success);
      this.openContentInPopup(success);
    },
    (err) => {
      console.log(err);
      alert('Server error while downloading file.');
    }
  );
}


openContentInPopup(contentData: Blob) {
  const fileType = contentData.type; // Get the content type from the Blob

  if (fileType === 'application/pdf') {
    // PDF content
    const contentUrl = URL.createObjectURL(contentData);
    this.openPdfInPopup(contentUrl);
  } else if (fileType.startsWith('video/')) {
    // Video content (assuming the Blob type starts with 'video/')
    const contentUrl = URL.createObjectURL(contentData);
    this.openVideoInPopup(contentUrl);
  }
  else if (fileType.startsWith('jfif/') || fileType.startsWith('image/jpeg') || fileType.startsWith('image/gif') || fileType.startsWith('image/png')) {
    const contentUrl = URL.createObjectURL(contentData);
    this.openImgInPopup(contentUrl);
  }
   else {
    console.log('Unsupported content type');
  }
}



openVideoInPopup(contentUrl: string) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '90%'; // Set the width
  dialogConfig.height = '95%'; // Add a custom CSS class for styling
  dialogConfig.data = { contentUrl };

  const dialogRef = this.dialog.open(VideoViewerDialogComponent, dialogConfig);
}

openPdfInPopup(contentUrl: string) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '90%'; // Set the width
  dialogConfig.height = '95%'; // Set the height
  dialogConfig.panelClass = 'custom-dialog-class'; // Add a custom CSS class for styling
  dialogConfig.data = { contentUrl };

  const dialogRef = this.dialog.open(PdfViewerDialogComponent, dialogConfig);
}





openImgInPopup(contentUrl: string) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '90%'; // Set the width
  dialogConfig.height = '95%'; // Set the height
  dialogConfig.panelClass = 'custom-dialog-class'; // Add a custom CSS class for styling
  dialogConfig.data = { contentUrl };

  const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
}





  // openContentInPopup(contentUrl: string) {
  //   const dialogRef = this.dialog.open(ContentViewDialogComponent, {
  //     width: '80%', 
  //     data: { contentUrl },
  //   });
  // }

  downloadContent(nm: any, url: any) {
    this.contentService.downloadContent(url).subscribe(
      (success) => {
        saveAs(success, nm);
      },
      (err) => {
        console.log(err);
        alert('Server error while downloading file.');
      }
    );
  }
}
