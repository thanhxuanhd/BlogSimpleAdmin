export class PostCategoryViewModel {
    Id: any;
    CategoryName: string;
    CagegoryDescription: string;
    IsPublic: boolean;
    ParentPostCategory: any;
    Url: string;
    MetaData: string;
    MetaDescription: string;
    Posts: Array<any>;
    PostCategories: Array<any>;
    /**
     *
     */
    constructor() {
        this.Posts = [];
        this.PostCategories = [];
        this.ParentPostCategory = '';
        this.IsPublic = true;
    }
}
