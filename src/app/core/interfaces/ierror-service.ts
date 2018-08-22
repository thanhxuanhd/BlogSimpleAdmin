import { FormGroup, AbstractControl } from '@angular/forms';
import { FormError } from '../models/error.model';
export interface IErrorService {
    setFormEdit(form: FormGroup);
    findFieldControl(field: string): AbstractControl;
    fetchFieldErrors(data: any[]): any;
    fieldErrors(name: string): FormError[];
    getErrors(control: AbstractControl, controlName: string): FormError[];
}
