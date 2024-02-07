import { Injectable } from "@angular/core";

export interface Menu{
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    {state: 'dashboard',name: 'Dashboard',icon: 'dashboard',role: ''},
    {state: 'enrollment', name: 'Enroll Students', icon: 'person_add', role: 'Admin' },
    {state: 'courses',name: 'Manage Courses',icon: 'settings',role: 'Admin' },
    {state: 'content-management', name: 'Add Content', icon: 'add_circle', role: 'Instructor' },
    {state: 'view-content', name: 'View Content', icon: 'visibility', role: '' },
    {state: 'user', name: 'Approve Student', icon: 'check_circle', role: 'Admin' },
    {state: 'add-teacher', name: 'Add Teacher', icon: 'person_add', role: 'Admin' }

]


@Injectable()
export class MenuItems {
    getMenuItem(): Menu[] {
        return MENUITEMS;
    }
}
