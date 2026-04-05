import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
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
  selector: 'app-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.css'],
  imports: [
    RouterModule,
    TranslateModule,
    ToolbarComponent,
    FormsModule,
    CommonModule,
    MatToolbar
  ],
})
export class ChangePlanComponent {

  baristaFeatures: string[] = [];
  ownerFeatures: string[] = [];
  fullFeatures: string[] = [];

  showBaristaPlans: boolean = false;
  showOwnerPlans: boolean = false;

  constructor(
    private router: Router,
    private translate: TranslateService
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
    const selectedPlan: Plan = {
      type,
      name: '',
      translationKey: '',
      price: 0,
      features: []
    };

    switch (type) {
      case 'barista':
        selectedPlan.translationKey = 'PLANS.BARISTA.TITLE';
        selectedPlan.name = this.translate.instant(selectedPlan.translationKey);
        selectedPlan.price = 9;
        selectedPlan.features = this.baristaFeatures;
        break;
      case 'owner':
        selectedPlan.translationKey = 'PLANS.OWNER.TITLE';
        selectedPlan.name = this.translate.instant(selectedPlan.translationKey);
        selectedPlan.price = 9;
        selectedPlan.features = this.ownerFeatures;
        break;
      case 'full':
        selectedPlan.translationKey = 'PLANS.FULL.TITLE';
        selectedPlan.name = this.translate.instant(selectedPlan.translationKey);
        selectedPlan.price = 15;
        selectedPlan.features = this.fullFeatures;
        break;
    }

    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
    this.router.navigate(['/subscription/confirm-change-plan']);
  }

}