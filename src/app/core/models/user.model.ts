export class LoginViewModel {
    UserName: string;
    Password: string;
}

export class LoggedInUser {
    Id: string;
    AuthenToken: string;
    ExpiresIn: number;
    Roles: Array<string>;
    FullName: string;

    constructor(
        Id: string,
        AuthenToken: string,
        ExpiresIn: number,
        FullName: string,
        Roles: any, ) {
        this.Id = Id;
        this.AuthenToken = AuthenToken;
        this.ExpiresIn = ExpiresIn;
        this.FullName = FullName;
        this.Roles = Roles;
    }
}
