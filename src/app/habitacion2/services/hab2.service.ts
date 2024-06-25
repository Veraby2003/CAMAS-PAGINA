import { Injectable } from '@angular/core';

interface Cama {
  id: number;
  title: string;
  isOriginalImage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Hab2Service  {
  habitaciones: { [key: string]: Cama[] } = {};
  availableIds: { [key: string]: number[] } = {};
  nextId: { [key: string]: number } = {};
  maxCamas: number = 12;

  constructor() {
    if (this.isBrowser()) {
      this.loadState();
    }
  }

  initializeHabitacion(habitacion: string): void {
    if (!this.habitaciones[habitacion]) {
      this.habitaciones[habitacion] = [];
      this.availableIds[habitacion] = [];
      this.nextId[habitacion] = 1;
    }
  }

  addCama(habitacion2: string): void {
    this.initializeHabitacion(habitacion2);
    if (this.habitaciones[habitacion2].length < this.maxCamas) {
      let id: number;
      if (this.availableIds[habitacion2].length > 0) {
        id = this.availableIds[habitacion2].pop()!;
      } else {
        id = this.nextId[habitacion2]++;
      }
      this.habitaciones[habitacion2].push({ id, title: `Cama ${id}`, isOriginalImage: true });
      if (this.isBrowser()) {
        this.saveState();
      }
    } else {
      alert('No se pueden agregar más de 12 camas');
    }
  }

  removeCama(habitacion2: string): void {
    this.initializeHabitacion(habitacion2);
    if (this.habitaciones[habitacion2].length > 0) {
      const removedCama = this.habitaciones[habitacion2].pop();
      const confirmed = window.confirm('¿Estás seguro de que quieres eliminar una cama?');
      if (confirmed) {
        if (removedCama) {
          this.availableIds[habitacion2].push(removedCama.id);
        }
        if (this.isBrowser()) {
          this.saveState();
        }
      } else {
        if (removedCama) {
          this.habitaciones[habitacion2].push(removedCama); // Reinsertar la cama si la eliminación no fue confirmada
        }
      }
    }
  }

  toggleImage(habitacion2: string, cama: Cama): void {
    const confirmed = window.confirm('¿Estás seguro de que quieres cambiar de estado?');
    if (confirmed) {
      cama.isOriginalImage = !cama.isOriginalImage;
      if (this.isBrowser()) {
        this.saveState();
      }
    }
  }

  getButtonText(cama: Cama): string {
    return cama.isOriginalImage ? 'Sin Paciente' : 'Con Paciente';
  }

  private saveState(): void {
    const state = {
      habitaciones: this.habitaciones,
      availableIds: this.availableIds,
      nextId: this.nextId
    };
    localStorage.setItem('camaServiceState', JSON.stringify(state));
  }

  private loadState(): void {
    const savedState = localStorage.getItem('camaServiceState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.habitaciones = state.habitaciones;
      this.availableIds = state.availableIds;
      this.nextId = state.nextId;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
