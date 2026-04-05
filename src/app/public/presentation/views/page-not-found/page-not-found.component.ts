import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, TranslatePipe],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent implements OnInit {
  protected invalidPath = '';

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const url = this.router.url.split('?')[0].replace(/^\//, '');
    this.invalidPath = url || '—';
  }

  
  protected onNavigateToFeatures(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      void this.router.navigate(['/login']);
      return;
    }
    if (user.home) {
      void this.router.navigate([user.home]);
      return;
    }
    switch (user.plan) {
      case 'barista':
        void this.router.navigate(['/dashboard/barista']);
        break;
      case 'owner':
        void this.router.navigate(['/dashboard/owner']);
        break;
      case 'full':
        void this.router.navigate(['/dashboard/complete']);
        break;
      default:
        void this.router.navigate(['/login']);
    }
  }
}