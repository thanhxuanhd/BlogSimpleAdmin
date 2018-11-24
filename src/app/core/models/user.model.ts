export class LoginViewModel {
    UserName: string;
    Password: string;
    IncludeRefreshToken: boolean;
}

export class LoggedInUser {
    Id: string;
    AuthenToken: string;
    ExpiresIn: number;
    Roles: Array<string>;
    FullName: string;
    Email: string;

    constructor(
        Id: string,
        AuthenToken: string,
        ExpiresIn: number,
        FullName: string,
        Roles: any, Email: string) {
        this.Id = Id;
        this.AuthenToken = AuthenToken;
        this.ExpiresIn = ExpiresIn;
        this.FullName = FullName;
        this.Roles = Roles;
        this.Email = Email;
    }
}

export class UserViewModel {
    Email: string;
    Password: string;
    RePassword: string;
    FullName: string;
    BirthDay: any;
    Id: any;
    RoleIds: Array<any>;
    PhoneNumber: number;
    Sex: string;
}
