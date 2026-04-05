import { Component } from '@angular/core';
import { DefectLibraryListComponent } from '../../../../defect-library/presentation/components/defect-library-list/defect-library-list.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    DefectLibraryListComponent,
    ToolbarComponent,
    MatToolbar
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {

}