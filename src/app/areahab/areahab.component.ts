import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ComponenteConPalabrasComponent } from '../componente-con-palabras/componente-con-palabras.component';
import { SocketService } from '../services/socket.service';
import { CamaStateService } from './service/cama-state.service';

@Component({
  selector: 'app-area-hab',
  standalone: true,
  imports: [ComponenteConPalabrasComponent, CommonModule],
  templateUrl: './areahab.component.html',
  styleUrls: ['./areahab.component.css']
})
export class ComponenteConRectangulosComponent implements OnInit, OnDestroy {
  llamadasCamas: { habitacion: number, cama: number, message?: string }[] = [];
  private socketSubscription?: Subscription;
  private parpadeoActivo: { [key: number]: boolean } = {};
  private camaStateSubscription?: Subscription;

  constructor(
    private socketService: SocketService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private camaStateService: CamaStateService
  ) { }

  ngOnInit(): void {
    this.socketSubscription = this.socketService.onRoomCalled().subscribe(data => {
      const { habitacion, cama, message } = data;
      console.log('Data received:', data);

      if (habitacion !== null && cama !== null) {
        const nombreHabitacion = this.getNombreHabitacion(habitacion);
        this.camaStateService.setCalledCama(habitacion, cama, message);
        this.llamadasCamas = this.camaStateService.getCalledCamas();
        this.activarParpadeo(habitacion);
      }
    });

    this.camaStateSubscription = this.camaStateService.calledCamas$.subscribe(camas => {
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
    if (this.camaStateSubscription) {
      this.camaStateSubscription.unsubscribe();
    }
  }

  redirigir(habitacion: string) {
    this.router.navigate([habitacion]);
  }

  blinkRectangle(rectangleId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(rectangleId);
      if (element) {
        element.classList.add('blink');
        setTimeout(() => {
          element.classList.remove('blink');
          const habitacion = parseInt(rectangleId.replace('habitacion', ''), 10);
          if (this.parpadeoActivo[habitacion]) {
            this.blinkRectangle(rectangleId);
          }
        }, 1);
      }
    }
  }

  eliminarLlamada(index: number): void {
    const llamada = this.llamadasCamas[index];
    this.camaStateService.clearCalledCamaByIndex(index);
    this.llamadasCamas = this.camaStateService.getCalledCamas();

    // Verificar si aún hay llamadas activas para la misma habitación
    const llamadasActivas = this.llamadasCamas.filter(llamada =>
      this.parpadeoActivo[llamada.habitacion]
    );

    if (llamadasActivas.length === 0) {
      this.desactivarParpadeo(llamada.habitacion);
    }
  }

  private getNombreHabitacion(habitacion: number): string {
    switch (habitacion) {
      case 1: return 'Habitación Uno';
      case 2: return 'Habitación Dos';
      case 3: return 'Habitación Tres';
      case 4: return 'Habitación Cuatro';
      default: return '';
    }
  }

  private activarParpadeo(habitacion: number): void {
    if (!this.parpadeoActivo[habitacion]) {
      this.parpadeoActivo[habitacion] = true;
      this.blinkRectangle(`habitacion${habitacion}`);
    }
  }

  private desactivarParpadeo(habitacion: number): void {
    delete this.parpadeoActivo[habitacion];
  }
}