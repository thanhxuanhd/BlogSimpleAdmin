import { Observable } from 'rxjs/observable';

export interface IDataService {
    Get(url: string): Observable<any>;
    Post(url: string, model?: any): Observable<any>;
    Put(url: string, model?: any): Observable<any>;
    Delete(url: string, model?: any): Observable<any>;
}
