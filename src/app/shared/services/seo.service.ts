import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateTitle(title: string) {
    this.title.setTitle(`TODOS | ${title}`);
  }

  updateMetaTags(tags: { name: string; content: string }[]) {
    tags.forEach((tag) => this.meta.updateTag(tag));
  }

  setKeywords(keywords: string[]) {
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
  }

  setCanonicalUrl() {
    if (!isPlatformBrowser(this.platformId)) return;

    const canonicalLink: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") ||
      document.createElement('link');

    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', this.getFullUrl());
    document.head.appendChild(canonicalLink);
  }

  setOgUrl() {
    this.meta.updateTag({ property: 'og:url', content: this.getFullUrl() });
  }

  updateOgTags(title: string, description: string) {
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private getFullUrl(): string {
    return isPlatformBrowser(this.platformId)
      ? `${window.location.origin}${this.router.url}`
      : '';
  }

  setAllTags(title: string, description: string, keywords: string[]) {
    this.updateTitle(title);
    this.updateMetaTags([
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
    ]);
    this.setKeywords(keywords);
    this.setCanonicalUrl();
    this.setOgUrl();
    this.updateOgTags(title, description);
  }
}
