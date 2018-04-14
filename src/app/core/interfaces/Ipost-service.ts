import { PostViewModel } from '../models/post.model';
export interface IPostService {
    Get(): Array<PostViewModel>;
    Post(model: PostViewModel);
    Put(model: PostViewModel);
    Delete(id: any);
}
