import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { CoursesComponent } from './dialog/courses/courses.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { ViewMaterialComponent } from './view-material/view-material.component';
import { ViewContentComponent } from './view-content/view-content.component';
// import { AppPdfViewerDialogComponent } from './app-pdf-viewer-dialog/app-pdf-viewer-dialog.component';
import { PdfViewerDialogComponent } from './pdf-viewer-dialog/pdf-viewer-dialog.component';
import { VideoViewerDialogComponent } from './video-viewer-dialog/video-viewer-dialog.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
// import { ContentViewDialogComponent } from './content-view-dialog/content-view-dialog.component';
// import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
// import { ConfirmationComponent } from './dialog/view-bill-products/confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCoursesComponent,
    CoursesComponent,
    ManageUserComponent,
    ContentManagementComponent,
    // ConfirmationDialogComponent,
    ConfirmationComponent,
    ViewMaterialComponent,
    ViewContentComponent,
    // AppPdfViewerDialogComponent,
PdfViewerDialogComponent,
    VideoViewerDialogComponent,
    ImageDialogComponent,
    // ContentViewDialogComponent    
  ]
})
export class MaterialComponentsModule {}
