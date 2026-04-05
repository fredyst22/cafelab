import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from '../../../../public/presentation/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-toolbar-component',
  standalone: true,
  imports: [MatToolbar, LanguageSwitcherComponent],
  templateUrl: './toolbar-plan.component.html',
  styleUrl: './toolbar-plan.component.css'
})
export class ToolbarPlanComponent {

}