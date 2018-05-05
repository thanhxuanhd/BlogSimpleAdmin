import { Injectable, Inject } from '@angular/core';
import { PostViewModel } from '../models/post.model';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata-service';
import { Observable } from 'rxjs/observable';
@Injectable()
export class PostService {

    constructor(@Inject(IDataServiceToken) private dataService: IDataService) {

    }
    Get(keyWord = '', sortColunm = '', postCategoryId, pageIndex = 0, pageSize = 15, desc = false): Observable<any> {
        const url = `/api/Post?keyWord=${keyWord}&sortColunm=${sortColunm}
        &postCategoryId=${postCategoryId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
        return this.dataService.Get(url);
    }
    Post(model: PostViewModel): any { }
    Put(model: PostViewModel): any { }
    Delete(id: any) { }
}
