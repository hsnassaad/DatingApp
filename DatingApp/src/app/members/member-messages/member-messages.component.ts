import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/Model/Message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/Auth.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService, private authService: AuthService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < messages.length; index++) {
            if (messages[index].isRead === false && messages[index].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, messages[index].id);
            }

          }
        })
      )
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.toast.error(error);
      });
  }


  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.toast.error(error);
    });

  }
}
