import { Component, OnInit } from '@angular/core';
import { Message } from '../Model/Message';
import { Pagination } from '../Model/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/Auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginationResult } from '../Model/PaginationResult';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private authService: AuthService, private router: ActivatedRoute,
    private toast: ToastrService, private alertService: AlertifyService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage,
      this.messageContainer).subscribe((res: PaginationResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toast.error(error);
      });
  }

  deleteMessage(id: number) {
    this.alertService.confirm('Are you sure you want to delete this message', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.toast.success('Message has been deleted');
      }, error => {
        this.toast.error('failed to delete the message');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
