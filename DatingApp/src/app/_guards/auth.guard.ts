import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/Auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
              private toaster: ToastrService) { }

  canActivate(): boolean {

    if (this.authService.loggedIn()) {
      return true;
    }

    this.toaster.warning('You shall not pass!!!', '', {
      positionClass: 'toast-bottom-right'
    });
    this.router.navigate(['/home']);
  }

}
