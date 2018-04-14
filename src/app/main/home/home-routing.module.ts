import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent, data: {
            title: 'Home Page',
            urls: [{ title: 'Main', url: '/Main' }, { title: 'Home' }]
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
