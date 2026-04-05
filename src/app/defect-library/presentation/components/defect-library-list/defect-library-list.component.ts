import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatInput, MatPrefix, MatSuffix } from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { DefectLibraryApi } from '../../../application/defect-library.api';
import type { DefectLibraryEntry } from '../../../domain/model/defect-library-entry.entity';

@Component({
  selector: 'app-defect-library-list',
  standalone: true,
  templateUrl: './defect-library-list.component.html',
  styleUrl: './defect-library-list.component.css',
  imports: [
    TranslatePipe,
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    MatIconButton,
    NgIf,
    FormsModule,
    MatIconModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    ToolbarComponent,
    MatToolbar,
  ],
})
export class DefectLibraryListComponent implements OnInit {
  coffeeSearch = '';
  defectSearch = '';
  entries: DefectLibraryEntry[] = [];
  filteredEntries: DefectLibraryEntry[] = [];
  displayedColumns: string[] = ['peso', 'cafe', 'defecto', 'porcentaje', 'acciones'];

  constructor(
    private readonly defectLibraryApi: DefectLibraryApi,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.defectLibraryApi.getAll().subscribe({
      next: (list) => {
        this.entries = list;
        this.filteredEntries = [...list];
      },
      error: () => {
        this.entries = [];
        this.filteredEntries = [];
      },
    });
  }

  filterData(): void {
    const c = this.coffeeSearch.trim().toLowerCase();
    const d = this.defectSearch.trim().toLowerCase();
    this.filteredEntries = this.entries.filter((row) => {
      const coffeeLabel = (row.coffeeDisplayName ?? '').toLowerCase();
      const defectLabel = (row.name ?? '').toLowerCase();
      return (!c || coffeeLabel.includes(c)) && (!d || defectLabel.includes(d));
    });
  }

  clearCoffeeSearch(): void {
    this.coffeeSearch = '';
    this.filterData();
  }

  clearDefectSearch(): void {
    this.defectSearch = '';
    this.filterData();
  }

  goToDetail(id: number): void {
    void this.router.navigate(['/file', id]);
  }

  goToNew(): void {
    void this.router.navigate(['/new-defect']);
  }

  
  goToHome(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      void this.router.navigate(['/login']);
      return;
    }
    if (user.home) {
      void this.router.navigate([user.home]);
      return;
    }
    switch (user.plan) {
      case 'barista':
        void this.router.navigate(['/dashboard/barista']);
        break;
      case 'owner':
        void this.router.navigate(['/dashboard/owner']);
        break;
      case 'full':
        void this.router.navigate(['/dashboard/complete']);
        break;
      default:
        void this.router.navigate(['/']);
    }
  }
}