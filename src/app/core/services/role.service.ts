import { Injectable, Inject } from '@angular/core';
import { PostCategoryViewModel } from '../models/post-category.model';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata-service';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
@Injectable()
export class RoleService {
    URL_API_ROLE = `/api/${this.configuration.getConfiguration().API_VERSION}/Role`;
    constructor(@Inject(IDataServiceToken) private dataService: IDataService, private configuration: ConfigService) {

    }
    Get(keyWord = '', sortColunm = '', pageIndex = 0, pageSize = 15): Observable<any> {
        const url = `${this.URL_API_ROLE}?keyWord=${keyWord}&sortColunm=${sortColunm}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
        return this.dataService.Get(url);
    }
    Post(model: PostCategoryViewModel): Observable<any> {
        return this.dataService.Post(this.URL_API_ROLE, model);
    }
    Put(model: PostCategoryViewModel): Observable<any> {
        return this.dataService.Put(this.URL_API_ROLE, model);
    }
    Delete(id: any): Observable<any> {
        const url = `${this.URL_API_ROLE}/${id}`;
        return this.dataService.Delete(url);
    }
    GetAll(): Observable<PostCategoryViewModel[]> {
        const url = `${this.URL_API_ROLE}/GetAll`;
        return this.dataService.Get(url);
    }
    GetById(id: any): Observable<PostCategoryViewModel> {
        const url = `${this.URL_API_ROLE}/${id}`;
        return this.dataService.Get(url);
    }
    HandError(error: any) {
        this.dataService.HandError(error);
    }
}
