import { PostViewModel } from '../models/post.model';
import { Observable } from 'rxjs';
export interface IPostService {
    Get(keyWord, sortColunm, postCategoryId, pageIndex, pageSize, desc): Observable<any>;
    Post(model: PostViewModel);
    Put(model: PostViewModel);
    Delete(id: any);
}
