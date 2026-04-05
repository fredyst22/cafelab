import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { ViewCalibrationComponent } from '../../components/view-calibration/view-calibration.component';
import { AuthService } from '../../../../auth/infrastructure/AuthService';

@Component({
  selector: 'app-view-calibration-page',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, ViewCalibrationComponent, TranslatePipe],
  templateUrl: './view-calibration-page.component.html',
  styleUrls: ['./view-calibration-page.component.css', '../calibration-breadcrumb-shell.css'],
})
export class ViewCalibrationPageComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  goToHome(): void {
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
        void this.router.navigate(['/']);
    }
  }
}