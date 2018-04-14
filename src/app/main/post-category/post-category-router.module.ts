import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostCategoryComponent } from './post-category.component';

const routes: Routes = [
    {
        path: '', component: PostCategoryComponent, data: {
            title: 'Post Category Page',
            urls: [{ title: 'Main', url: '/main' }, { title: 'Post Category' }]
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostCategoryRoutingModule { }
