import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamaStateService {
  private localStorageKey = 'calledCamas'; // Clave para el almacenamiento local
  private calledCamasSubject = new BehaviorSubject<{ habitacion: number, cama: number, message?: string }[]>(this.loadFromLocalStorage());
  calledCamas$ = this.calledCamasSubject.asObservable();
  private redOutlineActive = new BehaviorSubject<boolean>(this.calledCamasSubject.getValue().length > 0);

  constructor() {}

  private loadFromLocalStorage(): { habitacion: number, cama: number, message?: string }[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCamas = localStorage.getItem(this.localStorageKey);
      return savedCamas ? JSON.parse(savedCamas) : [];
    }
    return [];
  }

  private updateLocalStorage(camas: { habitacion: number, cama: number, message?: string }[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(camas));
    }
  }

  setCalledCama(habitacion: number, cama: number, message?: string): void {
    const currentCamas = this.calledCamasSubject.getValue();
    const updatedCamas = [...currentCamas, { habitacion, cama, message }];
    this.calledCamasSubject.next(updatedCamas);
    this.updateLocalStorage(updatedCamas);
    this.redOutlineActive.next(true);
  }

  getCalledCamas(): { habitacion: number, cama: number, message?: string }[] {
    return this.calledCamasSubject.getValue();
  }

  clearCalledCamaByIndex(index: number): void {
    const currentCamas = this.calledCamasSubject.getValue();
    if (index >= 0 && index < currentCamas.length) {
      currentCamas.splice(index, 1);
      this.calledCamasSubject.next([...currentCamas]);
      this.updateLocalStorage(currentCamas);
      if (currentCamas.length === 0) {
        this.redOutlineActive.next(false);
      }
    }
  }

  isRedOutlineActive(): boolean {
    return this.redOutlineActive.getValue();
  }

  clearCalledCamas(): void {
    this.calledCamasSubject.next([]);
    this.redOutlineActive.next(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.localStorageKey);
    }
  }
}
