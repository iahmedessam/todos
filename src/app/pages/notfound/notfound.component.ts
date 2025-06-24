import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.setSeo();
  }

  setSeo(): void {
    this.translate
      .get([
        'SEO.notfound.title',
        'SEO.notfound.description',
        'SEO.notfound.keywords',
      ])
      .subscribe((seo) => {
        this.seoService.setAllTags(
          seo['SEO.notfound.title'],
          seo['SEO.notfound.description'],
          seo['SEO.notfound.keywords'].split(',')
        );
      });
  }
}
