import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Constants } from '../../core/constants/constants';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  currentLang!: string;
  addressEn = Constants.addressEn;
  addressAr = Constants.addressAr;
  workingHoursEn = Constants.workingHoursEn;
  workingHoursAr = Constants.workingHoursAr;

  socialMedia: { path: string; icon: string; label: string }[] = [
    { path: Constants.facebook, icon: 'pi-facebook', label: 'facebook' },
    { path: Constants.linkedIn, icon: 'pi-linkedin', label: 'linkedin' },
    { path: '', icon: 'pi-instagram', label: 'instagram' },
  ];

  contactUsInfo!: { label: string; values: string[]; icon: string }[];

  constructor(
    private _sharedDataService: SharedDataService,
    private seoService: SeoService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getCurrentLang();
    this.setSeo();
  }

  getCurrentLang() {
    this._sharedDataService.getLang().subscribe((lang) => {
      this.currentLang = lang;

      this.contactUsInfo = [
        {
          label: 'whatsapp',
          values: [
            this.currentLang == 'en'
              ? Constants.whatsappNumberEn
              : Constants.whatsappNumberAr,
          ],
          icon: 'pi-whatsapp',
        },
        { label: 'mail', values: [Constants.email], icon: 'pi-envelope' },
        {
          label: 'mobile-numbers',
          values: [
            this.currentLang == 'en'
              ? Constants.phoneNumber1En
              : Constants.phoneNumber1Ar,
            this.currentLang == 'en'
              ? Constants.phoneNumber2En
              : Constants.phoneNumber2Ar,
          ],
          icon: 'pi-phone',
        },
      ];
    });
  }

  setSeo(): void {
    this.translate
      .get([
        'SEO.contact.title',
        'SEO.contact.description',
        'SEO.contact.keywords',
      ])
      .subscribe((seo) => {
        this.seoService.setAllTags(
          seo['SEO.contact.title'],
          seo['SEO.contact.description'],
          seo['SEO.contact.keywords'].split(',')
        );
      });
  }
}
