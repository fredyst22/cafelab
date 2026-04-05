import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import { ToolbarPlanComponent } from '../../../../subscription/presentation/components/toolbar-plan/toolbar-plan.component';

@Component({
  selector: 'app-logup-owner-success-page',
  templateUrl: './logup-owner-success-page.component.html',
  standalone: true,
  imports: [
    MatButton,
    TranslatePipe,
    ToolbarPlanComponent
  ],
  styleUrls: ['./logup-owner-success-page.component.css']
})
export class LogupOwnerSuccessPageComponent {
  constructor(private router: Router) {}

  onContinue() {
    this.router.navigate(['/edit-profile']);
  }
}