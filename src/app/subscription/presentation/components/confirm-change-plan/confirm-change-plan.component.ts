import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbar } from '@angular/material/toolbar';
import { User } from '../../../../auth/domain/model/user.entity';
import { UserService } from '../../../../auth/infrastructure/user.service';
import { TranslateService } from '@ngx-translate/core';
import {ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';

@Component({
  standalone: true,
  selector: 'app-confirm-change-plan',
  templateUrl: './confirm-change-plan.component.html',
  styleUrls: ['./confirm-change-plan.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    MatToolbar,
    ToolbarComponent
  ]
})
export class ConfirmChangePlanComponent implements OnInit {
  selectedPlan: any;
  paymentForm!: FormGroup;
  formSubmitted = false;
  translatedFeatures: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  sanitizeInput(event: Event, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, maxLength);
    const controlName = input.getAttribute('formControlName');
    if (controlName) {
      this.paymentForm.get(controlName)?.setValue(input.value);
    }
  }

  ngOnInit(): void {
    const storedPlan = localStorage.getItem('selectedPlan');
    if (!storedPlan) {
      void this.router.navigate(['/subscription/change-plan']);
      return;
    }

    this.selectedPlan = JSON.parse(storedPlan);
    this.loadTranslatedFeatures(this.selectedPlan.type);

    this.translate.onLangChange.subscribe(() => {
      this.loadTranslatedFeatures(this.selectedPlan.type);
    });

    this.paymentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/\\d{2}$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      cardHolder: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required]]
    });
  }

  loadTranslatedFeatures(planType: string): void {
    let featureKey = '';
    switch (planType) {
      case 'barista':
        featureKey = 'PLANS.BARISTA.FEATURES';
        break;
      case 'owner':
        featureKey = 'PLANS.OWNER.FEATURES';
        break;
      case 'full':
        featureKey = 'PLANS.FULL.FEATURES';
        break;
    }

    this.translate.get(featureKey).subscribe((res: string[]) => {
      this.translatedFeatures = res;
    });
  }

  goBack(): void {
    void this.router.navigate(['/subscription/change-plan']);
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.paymentForm.invalid) {
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.get(key)?.markAsTouched();
      });
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as User;

    const updatedUser: User = {
      ...currentUser,
      hasPlan: true,
      plan: this.selectedPlan.type
    };

    this.userService.updateProfile(currentUser.id, updatedUser).subscribe({
      next: (apiUser: User) => {
        const merged = this.userService.mergeProfileResponse(currentUser, apiUser);
        localStorage.setItem('currentUser', JSON.stringify(merged));

        if (
          merged.role === 'barista' &&
          merged.plan === 'full' &&
          !(merged.cafeteriaName || '').trim()
        ) {
          void this.router.navigate(['/edit-profile-session']);
          return;
        }

        switch (merged.plan) {
          case 'owner':
            this.router.navigate(['/dashboard/owner']);
            break;
          case 'barista':
            this.router.navigate(['/dashboard/barista']);
            break;
          case 'full':
            this.router.navigate(['/dashboard/complete']);
            break;
          default:
            void this.router.navigate(['/subscription/select-plan']);
        }
      },
      error: (err) => {
        console.error('Error updating user after payment:', err);
      }
    });
  }

  hasError(field: string, errorType: string): boolean {
    const control = this.paymentForm.get(field);
    return !!(control && control.errors && control.errors[errorType] && (control.touched || this.formSubmitted));
  }

  isFieldInvalid(field: string): boolean {
    const control = this.paymentForm.get(field);
    return !!(control && control.invalid && (control.touched || this.formSubmitted));
  }

  latinCountries = [
    { code: 'AR', translationKey: 'COUNTRIES.ARGENTINA' },
    { code: 'BO', translationKey: 'COUNTRIES.BOLIVIA' },
    { code: 'BR', translationKey: 'COUNTRIES.BRAZIL' },
    { code: 'CL', translationKey: 'COUNTRIES.CHILE' },
    { code: 'CO', translationKey: 'COUNTRIES.COLOMBIA' },
    { code: 'CR', translationKey: 'COUNTRIES.COSTA_RICA' },
    { code: 'CU', translationKey: 'COUNTRIES.CUBA' },
    { code: 'DO', translationKey: 'COUNTRIES.DOMINICAN_REPUBLIC' },
    { code: 'EC', translationKey: 'COUNTRIES.ECUADOR' },
    { code: 'GT', translationKey: 'COUNTRIES.GUATEMALA' },
    { code: 'HN', translationKey: 'COUNTRIES.HONDURAS' },
    { code: 'MX', translationKey: 'COUNTRIES.MEXICO' },
    { code: 'NI', translationKey: 'COUNTRIES.NICARAGUA' },
    { code: 'PA', translationKey: 'COUNTRIES.PANAMA' },
    { code: 'PY', translationKey: 'COUNTRIES.PARAGUAY' },
    { code: 'PE', translationKey: 'COUNTRIES.PERU' },
    { code: 'PR', translationKey: 'COUNTRIES.PUERTO_RICO' },
    { code: 'SV', translationKey: 'COUNTRIES.EL_SALVADOR' },
    { code: 'UY', translationKey: 'COUNTRIES.URUGUAY' },
    { code: 'VE', translationKey: 'COUNTRIES.VENEZUELA' }
  ];
}