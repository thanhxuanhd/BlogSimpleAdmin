import { Injectable, Inject } from '@angular/core';
import { PostCategoryViewModel } from '../models/post-category.model';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata-service';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
    URL_API_USER = '/api/Account';
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) {

    }
    Get(keyWord = '', sortColunm = '', pageIndex = 0, pageSize = 15): Observable<any> {
        const url = `${this.URL_API_USER}?keyWord=${keyWord}&sortColunm=${sortColunm}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
        return this.dataService.Get(url);
    }
    Post(model: PostCategoryViewModel): Observable<any> {
        return this.dataService.Post(this.URL_API_USER, model);
    }
    Put(model: PostCategoryViewModel): Observable<any> {
        return this.dataService.Put(this.URL_API_USER, model);
    }
    Delete(id: any): Observable<any> {
        const url = `${this.URL_API_USER}/${id}`;
        return this.dataService.Delete(url);
    }
    GetAll(): Observable<PostCategoryViewModel[]> {
        const url = `${this.URL_API_USER}/GetAll`;
        return this.dataService.Get(url);
    }
    GetById(id: any): Observable<PostCategoryViewModel> {
        const url = `${this.URL_API_USER}/${id}`;
        return this.dataService.Get(url);
    }
    HandError(error: any) {
        this.dataService.HandError(error);
    }
}
