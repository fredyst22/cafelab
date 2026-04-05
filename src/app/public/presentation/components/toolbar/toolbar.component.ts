import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../../auth/infrastructure/AuthService';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    TranslatePipe,
  ],
  template: `
    <h2 mat-dialog-title>{{ 'NAVIGATION.LOGOUT_CONFIRM_TITLE' | translate }}</h2>
    <mat-dialog-content>
      <p>{{ 'NAVIGATION.LOGOUT_CONFIRM_MESSAGE' | translate }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" [mat-dialog-close]="false">
        {{ 'NAVIGATION.LOGOUT_CANCEL' | translate }}
      </button>
      <button mat-raised-button color="warn" type="button" [mat-dialog-close]="true">
        {{ 'NAVIGATION.LOGOUT_CONFIRM' | translate }}
      </button>
    </mat-dialog-actions>
  `,
})
export class LogoutConfirmDialogComponent {}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    TranslatePipe,
    LanguageSwitcherComponent,
    MatAnchor,
    RouterLink,
    RouterLinkActive,
    MatButton,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  redirectToFeatures() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.home) {
      this.router.navigate([user.home]);
    } else {
      switch (user.plan) {
        case 'barista':
          this.router.navigate(['/dashboard/barista']);
          break;
        case 'owner':
          this.router.navigate(['/dashboard/owner']);
          break;
        case 'full':
          this.router.navigate(['/dashboard/complete']);
          break;
        default:
          this.router.navigate(['/login']);
      }
    }
  }

  logout() {
    this.dialog
      .open(LogoutConfirmDialogComponent, { width: 'min(360px, 92vw)', autoFocus: 'dialog' })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.authService.logout();
          void this.router.navigate(['/login']);
        }
      });
  }
}
