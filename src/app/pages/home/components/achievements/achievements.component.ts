import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDataService } from '../../../../shared/services/shared-data.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent implements OnInit {
  currentLang!: string;
  trustedAchievements: { label: string; path: string }[] = [
    {
      label: 'consistent-quality',
      path: 'assets/images/icons/ribbon.svg',
    },
    {
      label: 'reliable-partnerships',
      path: 'assets/images/icons/hand-shake-checked.svg',
    },
    {
      label: 'a-shared-commitment-to-care',
      path: 'assets/images/icons/hand-shake-puzzle.svg',
    },
  ];

  distributionAchievements: { label: string; path: string }[] = [
    {
      label: 'cartons-delivered',
      path: 'assets/images/icons/checked-box.svg',
    },
    {
      label: 'trusted-distributors',
      path: 'assets/images/icons/hand-shake-white.svg',
    },
    {
      label: 'clinics-hospitals-beauty-centers',
      path: 'assets/images/icons/hand-stars.svg',
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

  navigateToPartners() {
    this._router.navigate([this.currentLang, 'about-us'], {
      fragment: 'partners',
    });
  }
}
