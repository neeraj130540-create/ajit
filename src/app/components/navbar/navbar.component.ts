import {
  Component,
  HostListener,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  activeSection = signal('home');

  navLinks = [
    { label: 'Home', href: '#home', icon: 'fa-house' },
    { label: 'Services', href: '#services', icon: 'fa-screwdriver-wrench' },
    { label: 'About', href: '#about', icon: 'fa-circle-info' },
    { label: 'How It Works', href: '#how-it-works', icon: 'fa-list-check' },
    { label: 'Book Service', href: '#book-service', icon: 'fa-calendar-check' },
  ];

  private scrollHandler = () => this.onWindowScroll();

  ngOnInit() {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 60);

    // Detect active section
    const sections = ['home', 'services', 'about', 'how-it-works', 'book-service'];
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) {
        this.activeSection.set(id);
        break;
      }
    }
  }

  toggleMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }

  scrollTo(href: string) {
    this.closeMenu();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
