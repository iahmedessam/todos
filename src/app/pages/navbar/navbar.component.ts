import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { SharedDataService } from '../../shared/services/shared-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  currentLang!: string;
  selectedLang: { label: string; icon: string }[] = [
    { label: '', icon: '' },
    { label: '', icon: '' },
  ];
  navbarLinks: { label: string; path: string; icon: string }[] = [
    { label: 'home', path: '', icon: '' },
    { label: 'about-us', path: 'about-us', icon: '' },
    { label: 'products', path: 'products/1', icon: '' },
    { label: 'contact-us', path: 'contact-us', icon: '' },
  ];

  constructor(private _sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.getCurrentLang();
  }

  getCurrentLang() {
    this._sharedDataService.getLang().subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  changeLang(): void {
    this._sharedDataService.changeLang();
  }
}
