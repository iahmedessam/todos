import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Testimonials } from '../../../../core/models/interfaces/testimonials.interface';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  testimonials: Testimonials[] = [
    {
      name: 'layla-hassan',
      content: 'first-review',
      country: 'first-location',
      path: 'assets/images/testimonials/first-user.png',
      stars: [1, 2, 3, 4, 5],
    },
    {
      name: 'omar-al-khatib',
      content: 'third-review',
      country: 'third-location',
      path: 'assets/images/testimonials/third-user.png',
      stars: [1, 2, 3, 4, 5],
    },
    {
      name: 'ahmed-yussef',
      content: 'second-review',
      country: 'second-location',
      path: 'assets/images/testimonials/second-user.png',
      stars: [1, 2, 3, 4],
    },
  ];
}
