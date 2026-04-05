import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';
import {LotListComponent} from '../../components/lot-list/lot-list.component';
import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lots-page',
  standalone: true,
  imports: [
    MatToolbar,
    ToolbarComponent,
    LotListComponent,
    TranslateModule
  ],
  templateUrl: './lots.component.html',
  styleUrl: './lots.component.css'
})
export class LotsComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goToHome(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    if (user.home) {
      this.router.navigate([user.home]);
      return;
    }
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
        this.router.navigate(['/']);
    }
  }

  refreshLots(): void {
    window.location.reload();
  }
}