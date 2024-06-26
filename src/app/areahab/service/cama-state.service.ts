import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamaStateService {
  private calledCamasSubject = new BehaviorSubject<{ habitacion: number, cama: number, message?: string }[]>([]);
  calledCamas$ = this.calledCamasSubject.asObservable();
  private redOutlineActive = new BehaviorSubject<boolean>(false);

  setCalledCama(habitacion: number, cama: number, message?: string): void {
    const currentCamas = this.calledCamasSubject.getValue();
    this.calledCamasSubject.next([...currentCamas, { habitacion, cama, message }]);
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
  }
}
