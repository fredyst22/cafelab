import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shared-page-not-found',
  imports: [TranslatePipe, MatButtonModule, MatIconModule],
  templateUrl: './page-not-found.html',
  standalone: true,
  styleUrl: './page-not-found.css',
})
export class PageNotFound implements OnInit {
  protected invalidPath = '';
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.invalidPath = this.route.snapshot.url.map((u) => u.path).join('/');
  }

  protected navigateToHome(): void {
    this.router.navigate(['/login']).then();
  }
}