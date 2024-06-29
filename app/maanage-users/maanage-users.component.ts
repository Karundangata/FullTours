import { Component, OnInit } from '@angular/core';
import { UserService } from '../userService';
import { User } from '../../user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  users: User[] = [];
  editedUser: User = { id: 0, username: '', email: '', password: '', name: '' };
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Error loading users:', error);
      }
    );
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.editedUser = { ...user };
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedUser = { id: 0, username: '', email: '', password: '', name: '' };
  }

  updateUser(): void {
    this.userService.updateUser(this.editedUser).subscribe(
      () => {
        console.log('Updated user:', this.editedUser);
        this.loadUsers();
        this.isEditing = false;
        this.editedUser = { id: 0, username: '', email: '', password: '', name: '' };
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(
      () => {
        console.log('Deleted user:', user);
        this.loadUsers();
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
