import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private languages = ['en', 'ar'];
  private currentLangIndex = 0;
  private langSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.languages[this.currentLangIndex]
  );

  constructor(
    private _router: Router,
    private _translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize language from the route on service creation
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeLang =
          this._router.routerState.snapshot.root.firstChild?.paramMap.get(
            'lang'
          );
        if (routeLang && this.languages.includes(routeLang)) {
          this.currentLangIndex = this.languages.indexOf(routeLang);
          this.langSubject.next(routeLang);
          this._translate.use(routeLang);
          this.updateDirection(routeLang);
        }
      });

    // Set the default language
    const defaultLang = this.languages[0];
    this._translate.setDefaultLang(defaultLang);
    this._translate.use(defaultLang);
    this.updateDirection(defaultLang);
  }

  updateDirection(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }

  getCurrentLang(): string {
    return this.langSubject.value;
  }

  getLang(): Observable<string> {
    return this.langSubject.asObservable();
  }

  changeLang(): void {
    this.currentLangIndex = (this.currentLangIndex + 1) % this.languages.length;
    const newLang = this.languages[this.currentLangIndex];
    this.langSubject.next(newLang);
    this._translate.use(newLang);
    this.updateDirection(newLang);
    this._router
      .navigate(['/', newLang, ...this._router.url.split('/').slice(2)])
      .then(() => {
        window.location.reload();
      });
  }

  setLang(lang: string): void {
    if (!this.languages.includes(lang)) {
      console.warn(`Language ${lang} is not supported.`);
      return;
    }

    this.currentLangIndex = this.languages.indexOf(lang);
    this.langSubject.next(lang);
    this._translate.use(lang);
    this.updateDirection(lang);

    // Navigate to same URL but with new language param
    this._router
      .navigate(['/', lang, ...this._router.url.split('/').slice(2)])
      .then(() => {
        window.location.reload();
      });
  }
}
