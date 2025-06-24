import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  certifications = [
    'mdr',
    'ppe',
    'iso-14001',
    'iso-45001',
    'iso-9001',
    'astm-d63',
    'astm-d69',
    'enn-455',
  ];
}
