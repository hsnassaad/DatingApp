import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../Model/user';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/Auth.service';

@Injectable()

export class MemberEditResover implements Resolve<User> {

    constructor(private userService: UserService, private router: Router, private toaster: ToastrService, private authService: AuthService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {

        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError( error => {
                this.toaster.error('Problem retriving your data');
                this.router.navigate(['/members']);

                return of(null);
            })
        );

    }

}
