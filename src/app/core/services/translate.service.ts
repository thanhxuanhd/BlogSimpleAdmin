import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './config.service';
import { SystemConfig } from '../enum/system.enum';
@Injectable()
export class TranslatesService {
    private currentLang = '';

    constructor(
        private translations: TranslateService,
        private configService: ConfigService) {
        this.currentLang = this.configService.getConfiguration().LAGUAGE.LanguageDefault;
        let language = localStorage.getItem(SystemConfig.LANG);
        if (!language) {
            localStorage.setItem(SystemConfig.LANG, JSON.stringify(this.currentLang));
            language = localStorage.getItem(SystemConfig.LANG);
        }
        this.translations.addLangs(this.configService.getConfiguration().LAGUAGE.LanguageSupports);
        this.translations.setDefaultLang(this.configService.getConfiguration().LAGUAGE.LanguageDefault);
        this.translations.use(JSON.parse(language));
    }

    public use(lang: string): void {
        this.currentLang = lang;
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;

        if (this.translations.instant(key)) {
            translation = this.translations.instant(key);
        }
        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key);
    }

    refreshText() {
        // refresh translation when language change
        this.translations.use(this.currentLang);
    }

    currentLanguage() {
        return this.currentLang;
    }
}
