import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit {
  animatedValues = signal<number[]>([0, 0, 0, 0]);
  hasAnimated = false;

  stats: Stat[] = [
    { value: 5000, suffix: '+', label: 'Happy Customers', icon: 'fa-face-smile', color: '#ff6b35' },
    { value: 10, suffix: '+', label: 'Years Experience', icon: 'fa-calendar-days', color: '#1565c0' },
    { value: 500, suffix: '+', label: 'Repairs Monthly', icon: 'fa-screwdriver-wrench', color: '#2e7d32' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: 'fa-star', color: '#f57f17' },
  ];

  ngOnInit() {
    this.observeSection();
  }

  private observeSection() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('stats-section');
    if (el) observer.observe(el);
  }

  private animateCounters() {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      this.animatedValues.set(this.stats.map((s) => Math.floor(s.value * eased)));

      if (step >= steps) {
        clearInterval(timer);
        this.animatedValues.set(this.stats.map((s) => s.value));
      }
    }, interval);
  }
}
