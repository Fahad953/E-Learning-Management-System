  import { Component, Inject } from '@angular/core';
  // import { MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  @Component({
    selector: 'app-image-dialog',
    templateUrl:'./image-dialog.component.html'
  })
  export class ImageDialogComponent {
    sanitizedContentUrl: SafeResourceUrl;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { contentUrl: string },  private dialogRef: MatDialogRef<ImageDialogComponent>, private sanitizer: DomSanitizer) {
      this.sanitizedContentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.contentUrl);
    }

    closeDialog() {
      this.dialogRef.close();
    }
  }
