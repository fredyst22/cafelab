import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface NuevaCataFormResult {
  name: string;
  origin: string;
  variety: string;
  processing: string;
  sessionDate: string;
  roastStyleNotes: string;
}

@Component({
  selector: 'app-nuevas-cata',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './nuevas-cata.component.html',
  styleUrls: ['./nuevas-cata.component.css'],
})
export class NuevasCataComponent {
  form = {
    name: '',
    origin: '',
    variety: '',
    processing: 'washed',
    sessionDate: new Date(),
    roastStyleNotes: '',
  };

  processingCodes = ['washed', 'natural', 'honey', 'experimental'] as const;

  constructor(private readonly dialogRef: MatDialogRef<NuevasCataComponent, NuevaCataFormResult>) {}

  crearSesion(): void {
    if (!this.form.name.trim() || !this.form.origin.trim() || !this.form.variety.trim() || !this.form.sessionDate) {
      return;
    }
    const d = this.form.sessionDate instanceof Date ? this.form.sessionDate : new Date(this.form.sessionDate);
    const iso = Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
    const out: NuevaCataFormResult = {
      name: this.form.name.trim(),
      origin: this.form.origin.trim(),
      variety: this.form.variety.trim(),
      processing: this.form.processing,
      sessionDate: iso,
      roastStyleNotes: this.form.roastStyleNotes.trim(),
    };
    this.dialogRef.close(out);
  }
}