import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../Model/user';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberDetailResover implements Resolve<User> {

    constructor(private userService: UserService, private router: Router, private toaster: ToastrService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {

        return this.userService.getUser(route.params.id).pipe(
            catchError( error => {
                this.toaster.error('Problem retriving data');
                this.router.navigate(['/members']);

                return of(null);
            })
        );

    }

}
