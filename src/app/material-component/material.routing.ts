import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { ViewMaterialComponent } from './view-material/view-material.component';
import { ViewContentComponent } from './view-content/view-content.component';



export const MaterialRoutes: Routes = [
    {
        path:'courses',
        component:ManageCoursesComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['Admin']
        }
    },
    {
        path:'user',
        component:ManageUserComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['Admin']
        }
    },
    {
        path:'content-management',
        component:ContentManagementComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['Admin','Instructor']
        }
    },
    {
        path:'view-content',
        component:ViewMaterialComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['Admin','Student','Instructor']
        }
    },
    {
        path: 'view-mat/:id', // Define a route parameter named 'id'
        component: ViewContentComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['Admin', 'Student', 'Instructor']
        }
    }
    
];
