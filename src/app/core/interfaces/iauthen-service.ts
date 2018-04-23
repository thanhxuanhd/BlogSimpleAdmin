import { LoginViewModel, LoggedInUser } from '../models/user.model';
import { Observable } from 'rxjs/observable';

export interface IAuthenService {
    Login(user: LoginViewModel): Observable<any>;
    Logout(): Observable<any>;
    GetCurrentUser(): LoggedInUser;
    IsUserAuthenticated(): boolean;
}