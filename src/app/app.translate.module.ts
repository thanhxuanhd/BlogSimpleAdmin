import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {
    TranslateModule,
    TranslateLoader,
    TranslatePipe
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { TranslatesService, ConfigService } from './core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const translationOptions = {
    loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
    }
};

@NgModule({
    imports: [TranslateModule.forRoot(translationOptions)],
    exports: [TranslateModule],
    providers: [TranslateService, TranslatesService],
    declarations: []
})
export class AppTranslationModule {
    constructor() {
    }
}
