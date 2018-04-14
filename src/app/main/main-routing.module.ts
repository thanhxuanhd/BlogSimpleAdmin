import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'post', loadChildren: './post/post.module#PostModule' },
            { path: 'postcategory', loadChildren: './post-category/post-category.module#PostCategoryModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
