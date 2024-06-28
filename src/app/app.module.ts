import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { RegistroComponent } from './registro/registro.component';
import { ComponenteConRectangulosComponent } from './areahab/areahab.component';
import { SocketService } from './services/socket.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Hab1Service } from './habitacion1/services/hab1.service';
import { Hab2Service } from './habitacion2/services/hab2.service';
import { Hab3Service } from './habitacion3/services/hab3.service';
import { Hab4Service } from './habitacion4/services/hab4.service';
import { CamaStateService } from './areahab/service/cama-state.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [CamaStateService,AuthService,SocketService,Hab1Service,Hab2Service,Hab3Service,Hab4Service, provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule {}
