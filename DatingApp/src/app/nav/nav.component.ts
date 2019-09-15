import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(
    public authService: AuthService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.toastr.success('Login succsesfuly', '', {
        positionClass: 'toast-bottom-right'
      });
    }, error => {
      this.toastr.error(error, '', {
        positionClass: 'toast-bottom-right'
      });
    }, () => {

      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.toastr.info('logged out', '', {
      positionClass: 'toast-bottom-right'
    });

    this.router.navigate(['/home']);

  }

}
