import {Injectable} from "@angular/core";
import {Observable, of, Subject} from "rxjs";
import { delay } from "rxjs/operators";
import { Notification } from "../interfaces/notification.interface"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationMessage = new Subject<Notification|null>()

  constructor() { }

  getNotification(): Observable<Notification|null> {
    return this.notificationMessage.asObservable()
  }

  showNotification(message: string, status: 'success' | 'error' | 'warning', delayTime = 5000): void {
    this.notificationMessage.next({ message, status });
    of(null).pipe(delay(delayTime)).subscribe(() => this.notificationMessage.next(null))
  }
}
