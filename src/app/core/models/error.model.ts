export class ErrorHandle {
    Validations: Array<ValidationResponse>;
    constructor() {
        this.Validations = [];
    }
}

export interface FormError {
    error: string;
    params: any;
    control: any;
}

export class ValidationResponse {
    Key: string;
    Errors: Array<string>;
    constructor() {
        this.Errors = [];
    }
}
