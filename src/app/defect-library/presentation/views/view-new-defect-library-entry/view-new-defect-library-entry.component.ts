import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { AddDefectLibraryEntryComponent } from '../../components/add-defect-library-entry/add-defect-library-entry.component';
import { AuthService } from '../../../../auth/infrastructure/AuthService';

@Component({
  selector: 'app-view-new-defect-library-entry',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, AddDefectLibraryEntryComponent, TranslatePipe, RouterLink],
  templateUrl: './view-new-defect-library-entry.component.html',
  styleUrl: './view-new-defect-library-entry.component.css',
})
export class ViewNewDefectLibraryEntryComponent {
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