import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ComponenteConPalabrasComponent } from '../componente-con-palabras/componente-con-palabras.component';
import { CommonModule } from '@angular/common';
import { Hab1Service } from './services/hab1.service';
import { SocketService } from '../services/socket.service';
import { CamaStateService } from '../areahab/service/cama-state.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-habitacion1',
  standalone: true,
  imports: [ComponenteConPalabrasComponent, CommonModule],
  templateUrl: './habitacion1.component.html',
  styleUrls: ['./habitacion1.component.css']
})
export class Habitacion1Component implements OnInit, OnDestroy {
  llamadasCamas: { habitacion: number, cama: number, message?: string }[] = [];
  habitacion1: string = 'habitacion1';
  habitacion: number = 1;
  private socketSubscription?: Subscription;

  constructor(
    public camaService: Hab1Service,
    @Inject(PLATFORM_ID) private platformId: Object,
    private camaStateService: CamaStateService,
    private socketService: SocketService,
    private router: Router,
    private http: HttpClient // Agrega HttpClient como una dependencia
  ) { }

  ngOnInit(): void {
    this.sendInitialPostRequest(); // Envía el POST request al inicio

    this.applyBlinkingState();

    // Suscripción al servicio de socket (si deseas recibir llamadas de camas por socket)
    this.socketSubscription = this.socketService.onRoomCalled().subscribe(data => {
      const { habitacion, cama, message } = data;
      console.log('Data received:', data);

      if (habitacion !== null && cama !== null) {
        const nombreHabitacion = this.getNombreHabitacion(habitacion);
        this.camaStateService.setCalledCama(habitacion, cama, message);
        this.llamadasCamas = this.camaStateService.getCalledCamas();
        this.activarParpadeo(habitacion);

        if (cama > 13) {
          // Simular eliminación de llamada para cama mayor que 13 después de recibir la respuesta
          setTimeout(() => {
            this.eliminarLlamada(this.llamadasCamas.findIndex(llamada => llamada.cama === cama));
          }, 1000);
        }
      }
    });

    // Suscripción al servicio de estado de camas
    this.camaStateService.calledCamas$.subscribe(camas => {
      this.llamadasCamas = camas;
      camas.forEach(llamada => {
        this.activarParpadeo(llamada.habitacion);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  sendInitialPostRequest(): void {
    const camaInicial = 13;
    this.http.post('http://localhost:3000/call-room', {
      habitacion: this.habitacion.toString(),
      cama: camaInicial.toString(),
      mensaje: ''
    }).subscribe(response => {
      console.log('Initial POST request successful:', response);
    });
  }

  activarParpadeo(habitacion: number): void {
    this.llamadasCamas.forEach(llamada => {
      if (llamada.habitacion === habitacion) {
        this.blinkRectangle(llamada.habitacion, llamada.cama);
      }
    });
  }

  blinkRectangle(habitacion: number, cama: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const elementId = `habitacion${habitacion}cama${cama}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.add('blink');
        this.camaService.toggleBlinking(this.habitacion1, cama, true);
      }
    }
  }
  eliminarLlamada(index: number): void {
    const llamada = this.llamadasCamas[index];
    this.stopBlink(llamada.habitacion, llamada.cama);
    this.camaStateService.clearCalledCamaByIndex(index);
  }

  stopBlink(habitacion: number, cama: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const elementId = `habitacion${habitacion}cama${cama}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.remove('blink');
        this.camaService.toggleBlinking(this.habitacion1, cama, false);
      }
    }
  }

  private getNombreHabitacion(habitacion: number): string {
    switch (habitacion) {
      case 1: return 'habitación1';
      case 2: return 'habitación2';
      case 3: return 'habitación3';
      case 4: return 'habitación4';
      default: return '';
    }
  }

  private applyBlinkingState(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.camaService.habitaciones[this.habitacion1].forEach(cama => {
        const isBlinking = this.camaService.isBlinking(this.habitacion1, cama.id);
        if (isBlinking) {
          const elementId = `habitacion${this.habitacion}cama${cama.id}`;
          const element = document.getElementById(elementId);
          if (element) {
            element.classList.add('blink');
          }
        }
      });
    }
  }
  registerLlamada(habitacion: number, cama: number): void {

    this.llamadasCamas.push({ habitacion, cama });
  }
  addCama() {
    this.camaService.addCama(this.habitacion1);
  }

  removeCama() {
    this.camaService.removeCama(this.habitacion1);
  }

  toggleImage(cama: { id: number, title: string, isOriginalImage: boolean }) {
    this.camaService.toggleImage(this.habitacion1, cama);
  }

  irinicio() {
    this.router.navigate(['/rectangulos']);
  }

}