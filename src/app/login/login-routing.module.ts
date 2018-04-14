import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '', component: LoginComponent,
        data: {
            title: 'Blog Simple Login'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
