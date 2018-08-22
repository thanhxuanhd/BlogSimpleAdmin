import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormError } from '../models/error.model';
import 'rxjs/operator/filter';
import 'rxjs/operator/map';

@Injectable()
export class ErrorService {
    private addEditForm: FormGroup;
    public submitted = false;

    constructor() { }

    public setFormEdit(form: FormGroup) {
        this.addEditForm = form;
    }

    public fieldErrors(name: string): FormError[] {
        const control = this.findFieldControl(name);
        if (control && (control.touched || this.submitted) && control.errors) {
            return this.getErrors(control, name);
        } else {
            return undefined;
        }
    }

    // protected handleSubmitError(error: any) {
    //     if (error.status === 422) {
    //         const data = error.json();
    //         const fields = Object.keys(data || {});
    //         fields.forEach(field => {
    //             const control = this.findFieldControl(field);
    //             const errors = this.fetchFieldErrors(data, field);
    //             control.setErrors(errors);
    //         });
    //     }
    // }

    public getErrors(
        control: AbstractControl,
        controlName: string
    ): FormError[] {
        return Object.keys(control.errors)
            .filter(error => control.errors[error])
            .map(error => {
                const params = control.errors[error];
                const invalid = {
                    error: error,
                    params: params === true || params === {} ? null : params,
                    control: controlName
                };
                return invalid;
            });
    }

    public findFieldControl(field: string): AbstractControl {
        let control: AbstractControl;
        if (field === 'base') {
            control = this.addEditForm;
        } else if (this.addEditForm.contains(field)) {
            control = this.addEditForm.get(field);
        } else if (
            field.match(/_id$/) &&
            this.addEditForm.contains(field.substring(0, field.length - 3))
        ) {
            control = this.addEditForm.get(field.substring(0, field.length - 3));
        } else if (field.indexOf('.') > 0) {
            let group = this.addEditForm;
            field.split('.').forEach(f => {
                if (group.contains(f)) {
                    control = group.get(f);
                    if (control instanceof FormGroup) { group = control; }
                } else {
                    control = group;
                }
            });
        } else {
            // Field is not defined in form but there is a validation error for it, set it globally
            control = this.addEditForm;
        }
        return control;
    }

    public fetchFieldErrors(data: any[]): any {
        const errors = {};
        data.forEach((error: any) => {
            errors[error] = error;
        });
        console.log('error service: ', errors);
        return errors;
    }
}
