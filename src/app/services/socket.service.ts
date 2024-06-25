import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Asegúrate de que esta URL coincida con la de tu servidor

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  onRoomCalled(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('roomCalled', (data) => {
        console.log('Event roomCalled received:', data); // Añadir log para verificar
        observer.next(data);
      });

      // Cleanup on unsubscribe
      return () => {
        this.socket.off('roomCalled');
      };
    });
  }
}
