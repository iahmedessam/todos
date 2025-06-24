import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ProductsComponent } from './components/products/products.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SeoService } from '../../shared/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ProductsComponent,
    CertificationsComponent,
    AchievementsComponent,
    TestimonialsComponent,
    OverviewComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private seoService: SeoService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.setSeo();
  }

  setSeo(): void {
    this.translate
      .get(['SEO.home.title', 'SEO.home.description', 'SEO.home.keywords'])
      .subscribe((seo) => {
        this.seoService.setAllTags(
          seo['SEO.home.title'],
          seo['SEO.home.description'],
          seo['SEO.home.keywords'].split(',')
        );
      });
  }
}
