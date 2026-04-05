import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../../shared/presentation/components/base-form.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { User } from '../../../domain/model/user.entity';
import { NgClass, CommonModule } from '@angular/common';
import { AuthService } from '../../../infrastructure/AuthService';
import { UserService } from '../../../infrastructure/user.service';

@Component({
  selector: 'app-edit-profile-session',
  templateUrl: './edit-profile-session.component.html',
  styleUrls: ['./edit-profile-session.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    NgClass
  ]
})
export class EditProfileSessionComponent extends BaseFormComponent implements OnInit {

  editProfileForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    super();
    this.editProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cafeteriaName: [''],
      experience: [''],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.editProfileForm.patchValue({
        name: this.currentUser.name || '',
        email: this.currentUser.email || '',
        cafeteriaName: this.currentUser.cafeteriaName || '',
        experience: this.currentUser.experience || '',
        paymentMethod: this.currentUser.paymentMethod || ''
      });
      this.syncCafeteriaFieldState();
    } else {
      this.router.navigate(['/login']);
    }
  }

  private syncCafeteriaFieldState(): void {
    const ctrl = this.editProfileForm.get('cafeteriaName');
    if (!ctrl || !this.currentUser) {
      return;
    }
    const isBarista = this.currentUser.role === 'barista';
    const isFullPlan = this.currentUser.plan === 'full';
    if (isBarista && isFullPlan) {
      ctrl.enable({ emitEvent: false });
      ctrl.setValidators([Validators.required]);
      if (!(ctrl.value as string)?.toString().trim() && this.currentUser.cafeteriaName) {
        ctrl.setValue(this.currentUser.cafeteriaName, { emitEvent: false });
      }
    } else if (isBarista && !isFullPlan) {
      ctrl.disable({ emitEvent: false });
      ctrl.clearValidators();
      ctrl.setValue('', { emitEvent: false });
    } else {
      ctrl.enable({ emitEvent: false });
      ctrl.clearValidators();
    }
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  get isCafeteriaNameRequired(): boolean {
    return (
      this.currentUser?.role === 'barista' && this.currentUser?.plan === 'full'
    );
  }

  onSubmit(): void {
    this.syncCafeteriaFieldState();
    if (!this.editProfileForm.valid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }
    if (this.currentUser) {
      const raw = this.editProfileForm.getRawValue() as {
        name: string;
        email: string;
        cafeteriaName: string;
        experience: string;
        paymentMethod: string;
      };
      const isBarista = this.currentUser.role === 'barista';
      const isFullPlan = this.currentUser.plan === 'full';
      const cafeteriaName =
        isBarista && !isFullPlan ? '' : (raw.cafeteriaName || '').trim();

      const updatedUser: User = {
        ...this.currentUser,
        name: raw.name,
        email: raw.email,
        cafeteriaName,
        experience: raw.experience,
        paymentMethod: raw.paymentMethod
      };

      this.userService.updateProfile(this.currentUser.id, updatedUser).subscribe({
        next: (apiUser: User) => {
          const merged = this.userService.mergeProfileResponse(this.currentUser!, apiUser);
          localStorage.setItem('currentUser', JSON.stringify(merged));
          this.navigateToDashboard(merged);
        },
        error: (err) => {
          console.error('Error al actualizar perfil:', err);
        }
      });
    }
  }

  goToChangePlan(): void {
    this.router.navigate(['/subscription/change-plan']);
  }

  private navigateToDashboard(user: User): void {
    if (user.home) {
      void this.router.navigate([user.home]);
      return;
    }
    switch (user.plan) {
      case 'owner':
        void this.router.navigate(['/dashboard/owner']);
        break;
      case 'barista':
        void this.router.navigate(['/dashboard/barista']);
        break;
      case 'full':
        void this.router.navigate(['/dashboard/complete']);
        break;
      default:
        void this.router.navigate(['/login']);
    }
  }
}