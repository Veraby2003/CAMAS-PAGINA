import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ComponenteConPalabrasComponent } from '../componente-con-palabras/componente-con-palabras.component';
import { CommonModule } from '@angular/common';
import { Hab1Service } from './services/hab1.service';
import { SocketService } from '../services/socket.service';
import { CamaStateService } from '../areahab/service/cama-state.service';

@Component({
  selector: 'app-habitacion1',
  standalone: true,
  imports: [ComponenteConPalabrasComponent, CommonModule],
  templateUrl: './habitacion1.component.html',
  styleUrls: ['./habitacion1.component.css']
})
export class Habitacion1Component implements OnInit, OnDestroy {
  habitacion1: string = 'habitacion1';
  habitacion: number = 1;
  private socketSubscription?: Subscription;

  constructor(
    public camaService: Hab1Service,
    @Inject(PLATFORM_ID) private platformId: Object,
    private camaStateService: CamaStateService,
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.applyBlinkingState();

    const calledCamas = this.camaStateService.getCalledCamas(); // Corregido a getCalledCamas
    const calledCama = calledCamas.find(cama => cama.habitacion === this.habitacion); // Ejemplo de cómo obtener una cama específica

    if (calledCama) {
      this.blinkRectangle(calledCama.habitacion, calledCama.cama);
    }

    this.socketSubscription = this.socketService.onRoomCalled().subscribe(data => {
      const habitacion = data.habitacion;
      const cama = data.cama;
      if (habitacion !== null && cama !== null) {
        this.blinkRectangle(habitacion, cama);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
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
}