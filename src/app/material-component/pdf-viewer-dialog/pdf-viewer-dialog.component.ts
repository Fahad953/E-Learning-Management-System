import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer-dialog',
  templateUrl: './pdf-viewer-dialog.component.html',
})
export class PdfViewerDialogComponent {
  sanitizedContentUrl: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { contentUrl: string },
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<PdfViewerDialogComponent>
  ) {
    this.sanitizedContentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.contentUrl);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
