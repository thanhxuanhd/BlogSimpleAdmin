import { Injectable, Inject } from '@angular/core';
import { PostViewModel } from '../models/post.model';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata-service';
import { Observable } from 'rxjs';
@Injectable()
export class PostService {
    URL_API_POST = '/api/Post';
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) {

    }
    Get(keyWord = '', sortColunm = '', postCategoryId, pageIndex = 0, pageSize = 15, desc = false): Observable<any> {
        const url = `${this.URL_API_POST}?keyWord=${keyWord}&sortColunm=${sortColunm}
        &postCategoryId=${postCategoryId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
        return this.dataService.Get(url);
    }
    Post(model: PostViewModel): Observable<any> {
        return this.dataService.Post(this.URL_API_POST, model);
    }
    Put(model: PostViewModel): Observable<any> {
        return this.dataService.Put(this.URL_API_POST, model);
    }
    Delete(id: any): Observable<any> {
        const url = `${this.URL_API_POST}/${id}`;
        return this.dataService.Delete(url);
    }
    GetById(id: any): Observable<PostViewModel> {
        const url = `${this.URL_API_POST}/${id}`;
        return this.dataService.Delete(url);
    }
    HandError(error: any) {
        this.dataService.HandError(error);
    }
}
