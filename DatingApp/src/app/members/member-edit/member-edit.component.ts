import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/user';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  photoUrl: string;

  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @HostListener('window: beforeunload', ['$event'])

  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private toaster: ToastrService, private authService: AuthService,
              private userService: UserService) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.user = data.user;
      });

      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

    }


  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.toaster.success('Profile updated successfuly');
      this.editForm.reset(this.user);
    }, error => {
      this.toaster.error(error);
    });
  }



  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
