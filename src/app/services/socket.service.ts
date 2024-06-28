import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subscription, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private socket!: Socket;
  private roomCalledSubscription!: Subscription;
  private destroy$ = new Subject<void>();

  constructor() {
    this.initSocketConnection();
  }

  private initSocketConnection(): void {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.subscribeToRoomCalledEvent();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.unsubscribeFromRoomCalledEvent();
    });
  }

  private subscribeToRoomCalledEvent(): void {
    this.roomCalledSubscription = this.onRoomCalled()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('Event roomCalled received:', data);
        // Aquí puedes manejar la lógica para procesar los datos recibidos del evento roomCalled
      });
  }

  private unsubscribeFromRoomCalledEvent(): void {
    if (this.roomCalledSubscription) {
      this.roomCalledSubscription.unsubscribe();
    }
  }

  onRoomCalled(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('roomCalled', (data) => {
        observer.next(data);
      });

      // Cleanup on unsubscribe
      return () => {
        this.socket.off('roomCalled');
      };
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.roomCalledSubscription) {
      this.roomCalledSubscription.unsubscribe();
    }
    this.socket.disconnect();
  }
}
