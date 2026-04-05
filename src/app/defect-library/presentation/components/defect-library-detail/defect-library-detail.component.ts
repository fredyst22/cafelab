import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { DefectLibraryApi } from '../../../application/defect-library.api';
import type { DefectLibraryEntry } from '../../../domain/model/defect-library-entry.entity';

@Component({
  selector: 'app-defect-library-detail',
  standalone: true,
  templateUrl: './defect-library-detail.component.html',
  styleUrl: './defect-library-detail.component.css',
  imports: [TranslatePipe, MatIconModule, NgIf],
})
export class DefectLibraryDetailComponent implements OnInit {
  entry: DefectLibraryEntry | null = null;
  show: 'main' | 'causes' | 'solutions' = 'main';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly defectLibraryApi: DefectLibraryApi,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) {
      return;
    }
    this.defectLibraryApi.getById(id).subscribe({
      next: (e) => {
        this.entry = e;
      },
      error: () => {
        this.entry = null;
      },
    });
  }

  showCauses(): void {
    this.show = 'causes';
  }

  showSolutions(): void {
    this.show = 'solutions';
  }

  goBack(): void {
    void this.router.navigate(['/libraryDefects']);
  }

  showMain(): void {
    this.show = 'main';
  }
}