import { PostCategoryViewModel } from '../models/post-category.model';
import { Observable } from 'rxjs';
export interface IPostCategoryService {
    Get(keyWord, sortColunm, pageIndex, pageSize): Observable<any>;
    Post(model: PostCategoryViewModel): any;
    Put(model: PostCategoryViewModel);
    Delete(id: any);
}
