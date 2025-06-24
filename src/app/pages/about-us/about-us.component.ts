import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit {
  todayProducts: { label: string; path: string }[] = [
    { label: 'nurses-doctors', path: 'assets/images/icons/hospital.svg' },
    { label: 'salon', path: 'assets/images/icons/salon.svg' },
    { label: 'food-handlers', path: 'assets/images/icons/food-handler.svg' },
    { label: 'elder-care', path: 'assets/images/icons/elder-care.svg' },
  ];

  identity: { label: string; content: string[] }[] = [
    { label: 'our-mission', content: ['our-mission-content'] },
    { label: 'our-vision', content: ['our-vision-content'] },
    {
      label: 'our-values',
      content: [
        'integrity-first',
        'people-over-profits',
        'uncompromising-quality',
        'reliability',
        'empathy',
      ],
    },
  ];

  distributionAchievements: { label: string; path: string }[] = [
    { label: 'cartons-delivered', path: 'assets/images/icons/checked-box.svg' },
    {
      label: 'trusted-distributors',
      path: 'assets/images/icons/hand-shake-white.svg',
    },
    { label: 'on-time', path: 'assets/images/icons/hand-stars.svg' },
  ];

  partners: { label: string; path: string; content: string[] }[] = [
    {
      label: 'ruyue',
      path: '/assets/images/partners/ruyue.png',
      content: ['ruyue-content-1', 'ruyue-content-2'],
    },
    {
      label: 'xny',
      path: '/assets/images/partners/xny.png',
      content: ['xny-content-1', 'xny-content-2', 'xny-content-3'],
    },
    {
      label: 'fitone',
      path: '/assets/images/partners/fitone.png',
      content: ['fitone-content-1', 'fitone-content-2'],
    },
    {
      label: 'titan-fine',
      path: '/assets/images/partners/titan-fine.png',
      content: [
        'titan-fine-content-1',
        'titan-fine-content-2',
        'titan-fine-content-3',
      ],
    },
    {
      label: 'tvn',
      path: '/assets/images/partners/tvn.svg',
      content: ['tvn-content-1', 'tvn-content-2'],
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private seoService: SeoService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.scrollToFragment();
    this.setSeo();
  }

  scrollToFragment() {
    this._route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    });
  }

  setSeo(): void {
    this.translate
      .get(['SEO.about.title', 'SEO.about.description', 'SEO.about.keywords'])
      .subscribe((seo) => {
        this.seoService.setAllTags(
          seo['SEO.about.title'],
          seo['SEO.about.description'],
          seo['SEO.about.keywords'].split(',')
        );
      });
  }
}
