import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostComponent } from './post.component';

const routes: Routes = [
    {
        path: '', component: PostComponent, data: {
            title: 'Post Page',
            urls: [{ title: 'Main', url: '/main' }, { title: 'Post' }]
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule { }
