import { PostViewModel } from '../models/post.model';
import { Observable } from 'rxjs';
export interface IRoleService {
    Get(keyWord, sortColunm, pageIndex, pageSize): Observable<any>;
    Post(model: PostViewModel): Observable<any>;
    Put(model: PostViewModel): Observable<any>;
    Delete(id: any): Observable<any>;
    GetById(id: any): Observable<PostViewModel>;
    HandError(error: any);
}
