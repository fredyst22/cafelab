import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { ToolbarinitComponent} from '../../../../public/presentation/components/toolbarinit/toolbarinit.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
  imports: [LoginFormComponent, ToolbarinitComponent]
})
export class LoginPageComponent {}