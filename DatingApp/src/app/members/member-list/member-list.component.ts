import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private toaster: ToastrService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {

      this.users = users;

    }, error => {
      this.toaster.error(error, '', {
        positionClass: 'toast-bottom-right'
      });
    });

  }


}
