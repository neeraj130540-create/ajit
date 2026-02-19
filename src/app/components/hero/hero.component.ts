import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition,
  sequence,
  stagger,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('heroAnim', [
      transition(':enter', [
        query('.hero-badge, .hero-title, .hero-subtitle, .hero-actions, .hero-badges-row', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(150, [
            animate('700ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('cardFloat', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.9)' }),
        animate('600ms 400ms ease', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  slides = [
    {
      image: 'https://images.unsplash.com/photo-1629829000714-3a5684a17827?auto=format&fit=crop&w=1200&q=80',
      badge: 'Air Conditioning Experts',
      title: 'Cool Comfort,',
      titleAccent: 'Anytime You Need',
      subtitle: 'Expert AC installation, repair & maintenance for all brands. Stay cool all year round with our certified technicians.',
      icon: 'fa-wind',
      color: '#1565C0',
    },
    {
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1200&q=80',
      badge: 'Refrigerator Specialists',
      title: 'Fresh Food,',
      titleAccent: 'Perfect Temperature',
      subtitle: 'All fridge repairs from cooling issues to gas refills. Keep your food fresh with our expert refrigerator service.',
      icon: 'fa-temperature-low',
      color: '#0D47A1',
    },
    {
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80',
      badge: 'Washing Machine Pros',
      title: 'Clean Clothes,',
      titleAccent: 'Every Single Time',
      subtitle: 'Fast & reliable washing machine repair services. Get your laundry back on track with our skilled engineers.',
      icon: 'fa-rotate',
      color: '#1E88E5',
    },
  ];

  trustBadges = [
    { icon: 'fa-shield-halved', text: '100% Genuine Parts' },
    { icon: 'fa-clock', text: 'Same Day Service' },
    { icon: 'fa-award', text: '90-Day Warranty' },
    { icon: 'fa-star', text: '5000+ Happy Customers' },
  ];

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentSlide.update((i) => (i + 1) % this.slides.length);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }

  scrollToBook() {
    const el = document.getElementById('book-service');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToServices() {
    const el = document.getElementById('services');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
