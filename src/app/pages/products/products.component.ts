import { Component, OnInit } from '@angular/core';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PRODUCTS_DATA } from '../../core/constants/products';
import { SeoService } from '../../shared/services/seo.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslateModule, ProductsFilterComponent, RouterOutlet, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products = PRODUCTS_DATA;
  isLoading!: boolean;

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

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setSeo(): void {
    this.translate
      .get([
        'SEO.products.title',
        'SEO.products.description',
        'SEO.products.keywords',
      ])
      .subscribe((seo) => {
        this.seoService.setAllTags(
          seo['SEO.products.title'],
          seo['SEO.products.description'],
          seo['SEO.products.keywords'].split(',')
        );
      });
  }
}
