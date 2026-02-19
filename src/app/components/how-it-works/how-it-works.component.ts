import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
  steps = [
    {
      step: '01',
      title: 'Book Online or Call',
      description: 'Fill out our simple booking form or call us directly. Tell us your appliance type and issue.',
      icon: 'fa-calendar-check',
      color: '#ff6b35',
      bg: 'rgba(255,107,53,0.1)',
    },
    {
      step: '02',
      title: 'Technician Visit',
      description: 'Our certified technician visits your home at your preferred time slot, usually the same day.',
      icon: 'fa-person-walking-arrow-right',
      color: '#1565c0',
      bg: 'rgba(21,101,192,0.1)',
    },
    {
      step: '03',
      title: 'Diagnosis & Quote',
      description: 'Free diagnosis of the problem. We provide a transparent price quote before starting any work.',
      icon: 'fa-magnifying-glass',
      color: '#2e7d32',
      bg: 'rgba(46,125,50,0.1)',
    },
    {
      step: '04',
      title: 'Repair & Service',
      description: 'Expert repair using genuine spare parts. Most repairs are completed in a single visit.',
      icon: 'fa-screwdriver-wrench',
      color: '#7b1fa2',
      bg: 'rgba(123,31,162,0.1)',
    },
    {
      step: '05',
      title: 'Quality Check',
      description: 'We run thorough quality tests before leaving. Your appliance gets a 90-day service warranty.',
      icon: 'fa-shield-check',
      color: '#f57f17',
      bg: 'rgba(245,127,23,0.1)',
    },
  ];

  whyChooseUs = [
    { icon: 'fa-clock', title: 'Same Day Service', desc: 'Book before 2 PM for same-day service' },
    { icon: 'fa-indian-rupee-sign', title: 'Affordable Prices', desc: 'Best rates with no hidden charges' },
    { icon: 'fa-certificate', title: 'Certified Technicians', desc: 'All technicians are factory trained' },
    { icon: 'fa-shield-halved', title: '90-Day Warranty', desc: 'All repairs covered under warranty' },
    { icon: 'fa-tags', title: 'Genuine Parts', desc: 'Only OEM and genuine spare parts used' },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Customer support available all day' },
  ];
}
