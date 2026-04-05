import { Component, OnInit } from '@angular/core';
import { EditProfileFormComponent } from '../../components/edit-profile-form/edit-profile-form.component';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { ToolbarinitComponent } from '../../../../public/presentation/components/toolbarinit/toolbarinit.component';
import { User } from '../../../domain/model/user.entity';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css'],
  standalone: true,
  imports: [EditProfileFormComponent, ToolbarComponent, ToolbarinitComponent, NgIf]
})
export class EditProfilePageComponent implements OnInit {
  currentUser: User | null = null;

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  get showToolbar(): boolean {
    return !!this.currentUser?.hasPlan;
  }
}