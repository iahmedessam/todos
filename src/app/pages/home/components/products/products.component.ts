import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../../core/models/interfaces/product.interface';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../shared/services/shared-data.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  currentLang!: string;
  products: Product[] = [
    {
      brand: 'Fit pro',
      image: 'assets/images/products/fitpro.svg',
      types: [
        {
          id: 1,
          name: 'nitrile',
          desc: '',
          path: 'assets/images/products/types/fitpro-nitrile.svg',
        },
        {
          id: 2,
          name: 'latex',
          desc: '',
          path: 'assets/images/products/types/fitpro-latex.svg',
        },
        {
          id: 3,
          name: 'vinyl',
          desc: '',
          path: 'assets/images/products/types/fitpro-vinyl.svg',
        },
        {
          id: 4,
          name: 'condoms',
          desc: 'classic',
          path: 'assets/images/products/types/condoms-classic.svg',
        },
        {
          id: 5,
          name: 'condoms',
          desc: 'pleasure-intense',
          path: 'assets/images/products/types/condoms-pleasure-intense.svg',
        },
        {
          id: 6,
          name: 'condoms',
          desc: 'long-lasting',
          path: 'assets/images/products/types/condoms-long-lasting.svg',
        },
      ],
    },
    {
      brand: 'Care on',
      image: 'assets/images/products/care-on.svg',
      types: [
        {
          id: 7,
          name: 'nitrile',
          desc: '',
          path: 'assets/images/products/types/care-on-nitrile.svg',
        },
        {
          id: 8,
          name: 'latex',
          desc: '',
          path: 'assets/images/products/types/care-on-latex.svg',
        },
        {
          id: 9,
          name: 'vinyl',
          desc: '',
          path: 'assets/images/products/types/care-on-vinyl.svg',
        },
      ],
    },
    {
      brand: 'TVN',
      image: 'assets/images/products/tvn.svg',
      types: [
        {
          id: 10,
          name: 'protein-shake',
          desc: 'green-apple',
          path: 'assets/images/products/types/protein-shake-apple.svg',
        },
        {
          id: 10,
          name: 'protein-shake',
          desc: 'orange',
          path: 'assets/images/products/types/protein-shake-orange.svg',
        },
        {
          id: 10,
          name: 'protein-shake',
          desc: 'lemon',
          path: 'assets/images/products/types/protein-shake-lemon.svg',
        },
      ],
    },
    {
      brand: 'XNY',
      image: 'assets/images/products/xny.svg',
      types: [
        {
          id: 11,
          name: 'surgical-staplers',
          desc: 'Description',
          path: 'assets/images/products/types/SS1.svg',
        },
        {
          id: 11,
          name: 'surgical-staplers',
          desc: 'Description',
          path: 'assets/images/products/types/SS2.svg',
        },
        {
          id: 11,
          name: 'surgical-staplers',
          desc: 'Description',
          path: 'assets/images/products/types/SS3.svg',
        },
      ],
    },
  ];

  constructor(
    private _sharedDataService: SharedDataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentLang();
  }

  getCurrentLang() {
    this._sharedDataService.getLang().subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  navigateToProduct(productId: number) {
    this._router.navigate([this.currentLang, 'products', productId], {
      fragment: 'products',
    });
  }
}
