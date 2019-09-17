import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})

export class MemberCardComponent implements OnInit {

  @Input() user: User;


  constructor(private authService: AuthService,
              private userService: UserService, private toaster: ToastrService) { }

  ngOnInit() {
  }



  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(() => {
      this.toaster.success('You have liked ' + this.user.knownAs);
    }, error => {
      this.toaster.error(error);
    });
  }

}
