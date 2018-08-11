import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './core';
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'main', loadChildren: './main/main.module#MainModule', canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true }), NgbModule.forRoot()],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AppRoutingModule { }
