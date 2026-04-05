import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GrindCalibrationApi } from '../../../../grind-calibration/application/grind-calibration.api';
import type { GrindCalibrationEntry } from '../../../../grind-calibration/domain/model/grind-calibration-entry.entity';

@Component({
  selector: 'app-more-info-calibration',
  templateUrl: './more-info-calibration.component.html',
  standalone: true,
  imports: [TranslatePipe, NgIf, MatSnackBarModule],
  styleUrls: ['./more-info-calibration.component.css'],
})
export class MoreInfoCalibrationComponent implements OnInit {
  calibration: GrindCalibrationEntry | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly grindCalibrationApi: GrindCalibrationApi,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      void this.router.navigate(['/grind-calibration']);
      return;
    }
    this.grindCalibrationApi.getById(id).subscribe({
      next: (data) => {
        this.calibration = data;
      },
      error: () => {
        this.snackBar.open(
          this.translate.instant('GRIND_CALIBRATION_BC.ERRORS.DETAIL'),
          undefined,
          { duration: 4000 },
        );
        void this.router.navigate(['/grind-calibration']);
      },
    });
  }
}