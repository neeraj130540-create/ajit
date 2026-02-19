import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Book Service', href: '#book-service' },
  ];

  services = [
    { label: 'AC Installation & Repair', href: '#services' },
    { label: 'AC Gas Refilling', href: '#services' },
    { label: 'Refrigerator Repair', href: '#services' },
    { label: 'Fridge Gas Refilling', href: '#services' },
    { label: 'Washing Machine Repair', href: '#services' },
    { label: 'Annual Maintenance', href: '#services' },
  ];

  scrollTo(href: string) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
