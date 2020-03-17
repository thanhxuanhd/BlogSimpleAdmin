import { PostViewModel } from '../models/post.model';
import { Observable } from 'rxjs';
export interface IPostService {
    Get(keyWord, sortColunm, postCategoryId, pageIndex, pageSize, desc): Observable<any>;
    Post(model: PostViewModel): Observable<any>;
    Put(model: PostViewModel): Observable<any>;
    Delete(id: any): Observable<any>;
    GetById(id: any): Observable<PostViewModel>;
    HandError(error: any);
}
