import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { EditProfileSessionComponent } from '../../components/edit-profile-session/edit-profile-session.component';
import { User } from '../../../domain/model/user.entity';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profile-session-page',
  templateUrl: './edit-profile-session-page.component.html',
  styleUrls: ['./edit-profile-session-page.component.css'],
  standalone: true,
  imports: [ToolbarComponent, EditProfileSessionComponent, NgIf]
})
export class EditProfileSessionPageComponent implements OnInit {
  currentUser: User | null = null;

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

}