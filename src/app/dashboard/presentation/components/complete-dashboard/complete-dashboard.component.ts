import { Component } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-complete-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatToolbar,
    RouterLink,
    ToolbarComponent,
    TranslatePipe
  ],
  templateUrl: './complete-dashboard.component.html',
  styleUrl: './complete-dashboard.component.css'
})
export class CompleteDashboardComponent {

}