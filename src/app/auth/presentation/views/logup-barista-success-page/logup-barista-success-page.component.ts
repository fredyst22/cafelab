import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import { ToolbarinitComponent} from '../../../../public/presentation/components/toolbarinit/toolbarinit.component';

@Component({
  selector: 'app-logup-barista-success-page',
  standalone: true,
  templateUrl: './logup-barista-success-page.component.html',
  imports: [
    MatButton,
    TranslatePipe,
    ToolbarinitComponent
  ],
  styleUrls: ['./logup-barista-success-page.component.css']
})
export class LogupBaristaSuccessPageComponent {
  constructor(private router: Router) {}

  onContinue() {
    this.router.navigate(['/edit-profile']);
  }
}