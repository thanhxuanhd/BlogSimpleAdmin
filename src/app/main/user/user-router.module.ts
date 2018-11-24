import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '', component: UserComponent, data: {
            title: 'User',
            urls: [{ title: 'Main', url: '/main' }, { title: 'User' }]
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
