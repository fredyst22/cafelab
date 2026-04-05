import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { ToolbarPlanComponent } from '../toolbar-plan/toolbar-plan.component';
import { CommonModule } from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import { UserService } from '../../../../auth/infrastructure/user.service';
import { User } from '../../../../auth/domain/model/user.entity';

interface Plan {
  type: string;
  name: string;
  translationKey: string;
  price: number;
  features: string[];
}

@Component({
  standalone: true,
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css'],
  imports: [
    RouterModule,
    TranslateModule,
    ToolbarPlanComponent,
    CommonModule,
    MatToolbar,
  ],
})
export class SelectPlanComponent {

  baristaFeatures: string[] = [];
  ownerFeatures: string[] = [];
  fullFeatures: string[] = [];

  showBaristaPlans: boolean = false;
  showOwnerPlans: boolean = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private userService: UserService
  ) {
    this.translate.get('PLANS.BARISTA.FEATURES').subscribe((res: string[]) => this.baristaFeatures = res);
    this.translate.get('PLANS.OWNER.FEATURES').subscribe((res: string[]) => this.ownerFeatures = res);
    this.translate.get('PLANS.FULL.FEATURES').subscribe((res: string[]) => this.fullFeatures = res);
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as User;

    if (currentUser?.role === 'barista') {
      this.showBaristaPlans = true;
    } else if (currentUser?.role === 'owner') {
      this.showOwnerPlans = true;
    }
  }

  loadTranslations(): void {
    this.translate.get('PLANS.BARISTA.FEATURES').subscribe((res: string[]) => this.baristaFeatures = res);
    this.translate.get('PLANS.OWNER.FEATURES').subscribe((res: string[]) => this.ownerFeatures = res);
    this.translate.get('PLANS.FULL.FEATURES').subscribe((res: string[]) => this.fullFeatures = res);
  }

  selectPlan(type: string): void {
    let selected: Plan = {
      type,
      name: '',
      translationKey: '',
      price: 0,
      features: []
    };

    switch (type) {
      case 'barista':
        selected.translationKey = 'PLANS.BARISTA.TITLE';
        selected.name = this.translate.instant(selected.translationKey);
        selected.price = 9;
        selected.features = this.baristaFeatures;
        break;
      case 'owner':
        selected.translationKey = 'PLANS.OWNER.TITLE';
        selected.name = this.translate.instant(selected.translationKey);
        selected.price = 9;
        selected.features = this.ownerFeatures;
        break;
      case 'full':
        selected.translationKey = 'PLANS.FULL.TITLE';
        selected.name = this.translate.instant(selected.translationKey);
        selected.price = 15;
        selected.features = this.fullFeatures;
        break;
    }

    localStorage.setItem('selectedPlan', JSON.stringify(selected));

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as User;
    const updatedUser: User = {
      ...currentUser,
      plan: type,
      hasPlan: false
    };

    this.userService.updateProfile(currentUser.id, updatedUser).subscribe({
      next: (apiUser: User) => {
        const merged = this.userService.mergeProfileResponse(currentUser, apiUser);
        localStorage.setItem('currentUser', JSON.stringify(merged));
        if (merged.role === 'barista' && type === 'full') {
          void this.router.navigate(['/edit-profile']);
        } else {
          void this.router.navigate(['/subscription/confirm-plan']);
        }
      },
      error: (error: unknown) => {
        console.error('Update profile error:', error);
      },
    });
  }

}