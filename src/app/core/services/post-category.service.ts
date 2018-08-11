import { Injectable, Inject } from '@angular/core';
import { PostCategoryViewModel } from '../models/post-category.model';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata-service';
import { Observable } from 'rxjs';
@Injectable()
export class PostCategoryService {

    constructor(@Inject(IDataServiceToken) private dataService: IDataService) {

    }
    Get(keyWord = '', sortColunm = '', pageIndex = 0, pageSize = 15): Observable<any> {
        const url = `/api/PostCategory?keyWord=${keyWord}&sortColunm=${sortColunm}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
        return this.dataService.Get(url);
    }
    Post(model: PostCategoryViewModel): any { }
    Put(model: PostCategoryViewModel): any { }
    Delete(id: any) { }
}
