import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from 'models/notification.model';
import {
  notificationActionsEnum, notificationTypesEnum,
  notificationUserTypesEnum
} from 'models/enum/notifications.enum';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() notification: Notification;
  @Input() notificationUserTypesEnum: notificationUserTypesEnum;
  @Input() notificationTypesEnum: notificationTypesEnum;
  @Input() notificationActionsEnum: notificationActionsEnum;
  @Output() onRedirectFromChangeNotification: EventEmitter<Notification> = new EventEmitter();
  @Output() onRedirectFromEditNotification: EventEmitter<Notification> = new EventEmitter();
  @Output() onDeleteNotification: EventEmitter<Notification> = new EventEmitter();
  @Output() onDismissNotification: EventEmitter<Notification> = new EventEmitter();

  redirectToChange() {
    this.onRedirectFromChangeNotification.emit(this.notification);
  }

  redirectToEdit() {
    this.onRedirectFromEditNotification.emit(this.notification);
  }

  deleteNotification() {
    this.onDeleteNotification.emit(this.notification);
  }

  dismissNotification() {
    this.onDismissNotification.emit(this.notification);
  }
}
