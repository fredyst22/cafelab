import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';
import {RoastProfileListComponent} from '../../components/roast-profile-list/roast-profile-list.component';

@Component({
  selector: 'app-roasting-page',
  standalone: true,
  imports: [
    MatToolbar,
    ToolbarComponent,
    RoastProfileListComponent
  ],
  templateUrl: './roasting-page.component.html',
  styleUrl: './roasting-page.component.css'
})
export class RoastingPageComponent {

}