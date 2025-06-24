import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../../../shared/services/shared-data.service';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
})
export class ProductsFilterComponent implements OnInit {
  @Input({ required: true }) products!: any;
  @Output() loading = new EventEmitter<boolean>();
  currentLang!: string;
  openCategoryIndex: number | null = null;
  selectedProductId!: number;

  constructor(
    private _sharedDataService: SharedDataService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrentLang();
    this.getProductId();
  }

  toggleDropdown(index: number) {
    this.openCategoryIndex = this.openCategoryIndex === index ? null : index;
  }

  isDropdownOpen(index: number): boolean {
    return this.openCategoryIndex === index;
  }

  getCurrentLang() {
    this._sharedDataService.getLang().subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  getProductId() {
    this._route.params.subscribe((params) => {
      const productId = +params['id'];
      this.selectedProductId = productId;
    });
  }

  navigatToProduct(productId: number) {
    this.loading.emit(true);
    setTimeout(() => {
      this.loading.emit(false);
      this._router.navigate([this.currentLang, 'products', productId]);
    }, 500);
  }
}
