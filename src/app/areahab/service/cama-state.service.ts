import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CamaStateService {
  private calledCamas: { habitacion: number, cama: number, nombreHabitacion: string }[] = [];
  private redOutlineActive: boolean = false;

  setCalledCama(habitacion: number, cama: number, nombreHabitacion: string): void {
    this.calledCamas.push({ habitacion, cama, nombreHabitacion });
    this.redOutlineActive = true;
  }

  getCalledCamas(): { habitacion: number, cama: number, nombreHabitacion: string }[] {
    return this.calledCamas;
  }

  clearCalledCamaByIndex(index: number): void {
    if (index >= 0 && index < this.calledCamas.length) {
      this.calledCamas.splice(index, 1);
    }
  }

  isRedOutlineActive(): boolean {
    return this.redOutlineActive;
  }

  clearCalledCamas(): void {
    this.calledCamas = [];
    this.redOutlineActive = false;
  }
}