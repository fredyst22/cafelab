import { Component } from '@angular/core';
import { LogupOwnerFormComponent } from '../../components/logup-owner-form/logup-owner-form.component';
import { ToolbarinitComponent} from '../../../../public/presentation/components/toolbarinit/toolbarinit.component';

@Component({
  selector: 'app-logup-owner-page',
  templateUrl: './logup-owner-page.component.html',
  styleUrls: ['./logup-owner-page.component.css'],
  standalone: true,
  imports: [LogupOwnerFormComponent, ToolbarinitComponent]
})
export class LogupOwnerPageComponent {}