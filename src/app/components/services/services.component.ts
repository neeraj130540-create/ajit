import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

interface ServiceItem {
  icon: string;
  label: string;
}

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  gradient: string;
  iconBg: string;
  icon: string;
  items: ServiceItem[];
  badge: string;
  badgeColor: string;
  startingPrice: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ServicesComponent implements OnInit {
  activeTab = signal(0);
  visible = signal(false);

  services: Service[] = [
    {
      id: 'ac',
      title: 'Air Conditioner',
      tagline: 'Stay Cool Every Day',
      description:
        'We offer complete AC solutions — from new installations to complex repairs and regular maintenance. Our certified technicians handle all brands including Voltas, Daikin, LG, Samsung, Carrier, and more.',
      image:
        'https://images.unsplash.com/photo-1643302294743-74dfdd0d4dd5?auto=format&fit=crop&w=600&q=80',
      gradient: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
      iconBg: 'rgba(21,101,192,0.12)',
      icon: 'fa-snowflake',
      badge: 'Most Popular',
      badgeColor: '#ff6b35',
      startingPrice: '₹299',
      items: [
        { icon: 'fa-plug', label: 'AC Installation' },
        { icon: 'fa-wrench', label: 'AC Repair & Service' },
        { icon: 'fa-wind', label: 'Gas Refilling' },
        { icon: 'fa-broom', label: 'Deep Cleaning' },
        { icon: 'fa-rotate', label: 'PCB Repair' },
        { icon: 'fa-thermometer', label: 'Cooling Issues Fix' },
      ],
    },
    {
      id: 'fridge',
      title: 'Refrigerator',
      tagline: 'Keep Food Fresh Always',
      description:
        'Expert refrigerator repair and service for all types — single door, double door, side-by-side, and frost-free models. We fix cooling problems, compressor issues, leaks, and more with genuine spare parts.',
      image:
        'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=80',
      gradient: 'linear-gradient(135deg, #0d47a1 0%, #1e88e5 100%)',
      iconBg: 'rgba(13,71,161,0.12)',
      icon: 'fa-temperature-low',
      badge: 'Express Service',
      badgeColor: '#2e7d32',
      startingPrice: '₹349',
      items: [
        { icon: 'fa-snowflake', label: 'Cooling Repair' },
        { icon: 'fa-gas-pump', label: 'Gas Refilling' },
        { icon: 'fa-bolt', label: 'Compressor Repair' },
        { icon: 'fa-door-open', label: 'Door Seal Fix' },
        { icon: 'fa-temperature-arrow-up', label: 'Thermostat Repair' },
        { icon: 'fa-droplet', label: 'Water Leakage Fix' },
      ],
    },
    {
      id: 'washing',
      title: 'Washing Machine',
      tagline: 'Clean Laundry, Guaranteed',
      description:
        'Complete washing machine repairs for all types — top load, front load, and semi-automatic. We fix drum issues, motor problems, drainage faults, electronic board failures, and all other problems.',
      image:
        'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
      gradient: 'linear-gradient(135deg, #4a148c 0%, #7e57c2 100%)',
      iconBg: 'rgba(74,20,140,0.12)',
      icon: 'fa-rotate',
      badge: 'Same Day Fix',
      badgeColor: '#1565c0',
      startingPrice: '₹249',
      items: [
        { icon: 'fa-circle-dot', label: 'Drum Repair' },
        { icon: 'fa-gears', label: 'Motor Repair' },
        { icon: 'fa-faucet', label: 'Water Pump Fix' },
        { icon: 'fa-microchip', label: 'PCB Repair' },
        { icon: 'fa-rotate-left', label: 'Spin Issue Fix' },
        { icon: 'fa-triangle-exclamation', label: 'Error Code Diagnosis' },
      ],
    },
  ];

  ngOnInit() {
    this.observeSection();
  }

  private observeSection() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('services');
    if (el) observer.observe(el);
  }

  setTab(index: number) {
    this.activeTab.set(index);
  }

  scrollToBook() {
    const el = document.getElementById('book-service');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
