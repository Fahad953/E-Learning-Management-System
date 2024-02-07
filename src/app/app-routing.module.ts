import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGuardService } from './services/route-guard.service';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EnrollStudentComponent } from './enroll-student/enroll-student.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
          canActivate: [RouteGuardService],
          data: {
            expectedRole: ['Admin', 'Student', 'Instructor']
          }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['Admin', 'Student', 'Instructor']
        }
      },
      {
        path: 'add-teacher',
       component:AddTeacherComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['Admin']
        }
      },
      {
        path: 'enrollment',
       component:EnrollStudentComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['Admin']
        }
      }

      
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
