import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
            { path: 'postcategory', loadChildren: () => import('./post-category/post-category.module').then(m => m.PostCategoryModule) },
            { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
            { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
