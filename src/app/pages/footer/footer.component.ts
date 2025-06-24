import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Constants } from '../../core/constants/constants';
import { SharedDataService } from '../../shared/services/shared-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  currentLang!: string;
  workingHoursEn = Constants.workingHoursEn;
  workingHoursAr = Constants.workingHoursAr;
  copyRightsEn = Constants.copyRightsEn;
  copyRightsAr = Constants.copyRightsAr;
  contactUs: { label: string; icon: string }[] = [];
  quickLinks: string[] = ['about-us', 'contact-us', 'products'];
  followUsLinks: { path: string; icon: string; label: string }[] = [
    { path: Constants.facebook, icon: 'pi-facebook', label: 'Facebook' },
    { path: Constants.whatsapp, icon: 'pi-whatsapp', label: 'WhatsApp' },
    { path: Constants.linkedIn, icon: 'pi-linkedin', label: 'LinkedIn' },
    { path: Constants.instagram, icon: 'pi-instagram', label: 'Instagram' },
  ];

  constructor(private _sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.getCurrentLang();
  }

  getCurrentLang() {
    this._sharedDataService.getLang().subscribe((lang) => {
      this.currentLang = lang;
      this.updateContactUs();
    });
  }

  updateContactUs() {
    this.contactUs = [
      {
        label:
          this.currentLang == 'en' ? Constants.addressEn : Constants.addressAr,
        icon: 'pi-map-marker',
      },
      { label: Constants.email, icon: 'pi-envelope' },
      {
        label:
          this.currentLang == 'en'
            ? Constants.phoneNumber1En
            : Constants.phoneNumber1Ar,
        icon: 'pi-phone',
      },
      {
        label:
          this.currentLang == 'en'
            ? Constants.phoneNumber2En
            : Constants.phoneNumber2Ar,
        icon: 'pi-phone',
      },
    ];
  }

  scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
