import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CamaStateService } from '../areahab/service/cama-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-componente-con-palabras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componente-con-palabras.component.html',
  styleUrl: './componente-con-palabras.component.css'
})
export class ComponenteConPalabrasComponent {
  atendida: boolean = false;
  llamadasCamas: { habitacion: number, cama: number, message?: string }[] = [];
  habitacion: number;
  cama: number;

  constructor(
    public dialogRef: MatDialogRef<ComponenteConPalabrasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private camaStateService: CamaStateService
  ) {
    this.habitacion = data.habitacion;
    this.cama = data.cama;
    this.llamadasCamas = data.llamadasCamas;

    // Suscripción al servicio de estado de camas
    this.camaStateService.calledCamas$.subscribe(camas => {
     this.llamadasCamas = camas;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  eliminarLlamada(index: number): void {
    this.camaStateService.clearCalledCamaByIndex(index);

    this.llamadasCamas.splice(index, 0);
  const filteredLlamadasCamas = this.llamadasCamas.filter(cama => cama.habitacion == this.habitacion && cama.cama == this.cama);
  if (filteredLlamadasCamas.length == 0) {
    this.dialogRef.close();
  }
}
}