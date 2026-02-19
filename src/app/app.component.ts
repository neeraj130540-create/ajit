import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { StatsComponent } from './components/stats/stats.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { BookServiceComponent } from './components/book-service/book-service.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    StatsComponent,
    HowItWorksComponent,
    BookServiceComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-services></app-services>
      <app-stats></app-stats>
      <app-how-it-works></app-how-it-works>
      <app-book-service></app-book-service>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main { display: block; }
  `],
})
export class AppComponent {}
