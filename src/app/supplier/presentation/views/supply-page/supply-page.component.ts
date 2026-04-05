import { Component, OnInit } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';
import {SupplierListComponent} from '../../components/provider-list/supplier-list.component';
import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-supply-page',
  standalone: true,
  imports: [
    MatToolbar,
    ToolbarComponent,
    SupplierListComponent,
    TranslateModule
  ],
  templateUrl: './supply-page.component.html',
  styleUrl: './supply-page.component.css'
})
export class SupplyPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

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

  refreshSuppliers(): void {
    window.location.reload();
  }
}