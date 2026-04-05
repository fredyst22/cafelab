import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    TranslatePipe,
    LanguageSwitcher,
  ],
  templateUrl: './layout.html',
  standalone: true,
  styleUrl: './layout.css',
})
export class Layout implements OnInit, OnDestroy {
  isSidenavOpen = false;
  currentTime = '';
  private timeSubscription?: Subscription;

  navigationItems: { link: string; icon: string; label: string }[] = [
    { link: '/dashboard/barista', label: 'navigation.home', icon: 'home' },
    { link: '/support', label: 'navigation.support', icon: 'headset_mic' },
  ];

  ngOnInit(): void {
    this.timeSubscription = interval(1000).subscribe(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    });
  }

  ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe();
  }

  trackByLabel(_index: number, item: { link: string; icon: string; label: string }): string {
    return item.label;
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav(): void {
    this.isSidenavOpen = false;
  }
}