import { Component } from '@angular/core';
import { ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-barista-dashboard',
  standalone: true,
  imports: [ToolbarComponent, MatToolbar, RouterModule, TranslatePipe, MatCard, MatCardContent],
  templateUrl: './barista-dashboard.component.html',
  styleUrl: './barista-dashboard.component.css'
})
export class BaristaDashboardComponent {

}