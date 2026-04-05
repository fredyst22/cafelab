import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoffeeLot } from '../../../../coffee-lot/domain/model/coffee-lot.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-step-lot-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  templateUrl: './step-lot-selection.component.html',
  styleUrls: ['./step-lot-selection.component.css'],
})
export class StepLotSelectionComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() lots: CoffeeLot[] = [];
  @Input() progressValue = 0;
}