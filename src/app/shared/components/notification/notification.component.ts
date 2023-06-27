import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  message!: string|null|undefined;
  status!: string|null|undefined
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.getNotification().subscribe({
      next: (notification) => {
        this.message = notification?.message
        this.status = notification?.status
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
