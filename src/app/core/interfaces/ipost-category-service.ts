import { PostCategoryViewModel } from '../models/post-category.model';
import { Observable } from 'rxjs';
export interface IPostCategoryService {
    Get(keyWord, sortColunm, pageIndex, pageSize): Observable<any>;
    Post(model: PostCategoryViewModel): Observable<any>;
    Put(model: PostCategoryViewModel): Observable<any>;
    Delete(id: any): Observable<any>;
    GetAll(): Observable<PostCategoryViewModel[]>;
    GetById(id: any): Observable<PostCategoryViewModel>;
    HandError(error: any);
}
