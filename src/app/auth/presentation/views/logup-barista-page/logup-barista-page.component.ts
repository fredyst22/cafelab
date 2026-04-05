import { Component } from '@angular/core';
import { LogupBaristaFormComponent } from '../../components/logup-barista-form/logup-barista-form.component';
import { ToolbarinitComponent} from '../../../../public/presentation/components/toolbarinit/toolbarinit.component';

@Component({
  selector: 'app-logup-barista-page',
  templateUrl: './logup-barista-page.component.html',
  styleUrls: ['./logup-barista-page.component.css'],
  standalone: true,
  imports: [LogupBaristaFormComponent, ToolbarinitComponent]
})
export class LogupBaristaPageComponent {}