import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  overviews = [
    {
      title: 'who-we-are',
      firstContent: 'who-we-are-content-1',
      secondContent: 'who-we-are-content-2',
      image: 'assets/images/main/who-we-are.svg',
    },
    {
      title: 'what-we-do',
      firstContent: 'what-we-do-content-1',
      secondContent: 'what-we-do-content-2',
      image: 'assets/images/main/doctor-smile.svg',
    },
  ];
}
