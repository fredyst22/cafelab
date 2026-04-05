import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GrindCalibrationApi } from '../../../../grind-calibration/application/grind-calibration.api';
import type { GrindCalibrationEntry } from '../../../../grind-calibration/domain/model/grind-calibration-entry.entity';

@Component({
  selector: 'app-edit-calibration',
  templateUrl: './edit-calibration.component.html',
  standalone: true,
  imports: [TranslatePipe, FormsModule, NgIf, MatSnackBarModule],
  styleUrls: ['./edit-calibration.component.css'],
})
export class EditCalibrationComponent implements OnInit {
  calibration: GrindCalibrationEntry = {
    id: 0,
    userId: 0,
    name: '',
    method: '',
    equipment: '',
    grindNumber: '',
    aperture: 58,
    cupVolume: 30,
    finalVolume: 25,
    calibrationDate: '',
    comments: '',
    notes: '',
    sampleImage: null,
  };
  sampleImageName: string | null = null;

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
        this.calibration = { ...data };
        if (this.calibration.sampleImage) {
          this.sampleImageName = this.translate.instant('CALIBRATIONS.IMAGE_LOADED');
        }
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

  triggerFileInput(): void {
    const fileInput = document.getElementById('sampleImage') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    if (file.size > 102400) {
      this.snackBar.open(
        this.translate.instant('GRIND_CALIBRATION_BC.ERRORS.IMAGE_TOO_LARGE'),
        undefined,
        { duration: 4000 },
      );
      return;
    }
    this.sampleImageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.calibration.sampleImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpdate(): void {
    if (!this.calibration.calibrationDate?.trim()) {
      return;
    }
    const id = this.calibration.id;
    const payload: GrindCalibrationEntry = {
      ...this.calibration,
      name: this.calibration.name.trim(),
      method: this.calibration.method.trim(),
      equipment: this.calibration.equipment.trim(),
      grindNumber: this.calibration.grindNumber.trim(),
      aperture: Number(this.calibration.aperture),
      cupVolume: Number(this.calibration.cupVolume),
      finalVolume: Number(this.calibration.finalVolume),
      calibrationDate: this.calibration.calibrationDate.slice(0, 10),
      comments: this.calibration.comments?.trim() ?? '',
      notes: this.calibration.notes?.trim() ?? '',
    };
    this.grindCalibrationApi.update(id, payload).subscribe({
      next: () => void this.router.navigate(['/grind-calibration']),
      error: () => {
        this.snackBar.open(
          this.translate.instant('GRIND_CALIBRATION_BC.ERRORS.UPDATE'),
          undefined,
          { duration: 4000 },
        );
      },
    });
  }
}