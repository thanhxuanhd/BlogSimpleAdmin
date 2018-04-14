import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'main', loadChildren: './main/main.module#MainModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true }), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }
