import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../infrastructure/user.service';
import { User } from '../../../domain/model/user.entity';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import { ToolbarinitComponent} from '../../../../public/presentation/components/toolbarinit/toolbarinit.component';
import {AuthService } from '../../../infrastructure/AuthService';

@Component({
  selector: 'app-login-success-page',
  templateUrl: './login-success-page.component.html',
  standalone: true,
  imports: [
    MatButton,
    TranslatePipe,
    ToolbarinitComponent
  ],
  styleUrls: ['./login-success-page.component.css']
})
export class LoginSuccessPageComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private router: Router, private AuthService: UserService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onContinue() {
    if (this.currentUser?.isFirstLogin) {
      this.router.navigate(['/edit-profile']);
    } else {
      switch (this.currentUser?.plan) {
        case 'barista':
          this.router.navigate(['/dashboard/barista']);
          break;
        case 'owner':
          this.router.navigate(['/dashboard/owner']);
          break;
        case 'full':
          this.router.navigate(['/dashboard/complete']);
          break;
        default:
          this.router.navigate(['/subscription']);
          break;
      }
    }
  }
}