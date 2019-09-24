import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/Auth.service';
import { Message } from '../Model/Message';

@Injectable()

export class MessagesResover implements Resolve<Message[]> {

  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';



  constructor(private userService: UserService, private router: Router, private toaster: ToastrService,
    private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {

    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.toaster.error('Problem retriving messages');
        this.router.navigate(['/home']);
        return of(null);
      })
    );

  }

}
