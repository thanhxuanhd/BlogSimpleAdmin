import { Observable } from 'rxjs';

export interface IDataService {
    Get(url: string): Observable<any>;
    Post(url: string, model?: any): Observable<any>;
    Put(url: string, model?: any): Observable<any>;
    Delete(url: string): Observable<any>;
}
