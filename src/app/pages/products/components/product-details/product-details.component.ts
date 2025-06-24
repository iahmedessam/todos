import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PRODUCTS_DATA } from '../../../../core/constants/products';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDataService } from '../../../../shared/services/shared-data.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: any;
  images: string[] = [];
  selectedIndex = 0;
  clickedBtn: string | null = null;
  currentLang!: string;

  constructor(private _sharedDataService: SharedDataService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCurrentLang();
    this._route.params.subscribe((params) => {
      const id = +params['id'];
      this.loadProductById(id);
    });
  }

  getCurrentLang() {
    this._sharedDataService.getLang().subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  loadProductById(id: number) {
    for (const category of PRODUCTS_DATA) {
      for (const brand of category.brands) {
        const product = brand.products.find((p) => p.id === id);
        if (product) {
          this.selectedProduct = product;
          this.images = product.images;
          return;
        }
      }
    }
  }

  get selectedImage() {
    return this.images[this.selectedIndex];
  }

  handleClick(direction: 'next' | 'previous') {
    this.clickedBtn = direction;
    if (direction === 'next' && this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
    } else if (direction === 'previous' && this.selectedIndex > 0) {
      this.selectedIndex--;
    }
    setTimeout(() => {
      this.clickedBtn = null;
    }, 200);
  }
}
