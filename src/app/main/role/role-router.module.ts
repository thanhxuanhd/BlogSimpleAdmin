import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RoleComponent } from './role.component';

const routes: Routes = [
    {
        path: '', component: RoleComponent, data: {
            title: 'Role',
            urls: [{ title: 'Main', url: '/main' }, { title: 'Role' }]
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule { }
