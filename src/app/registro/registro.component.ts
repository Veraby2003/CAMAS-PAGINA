import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements AfterViewInit {
  email: string = '';
  password: string = '';

  @ViewChild('emailInput') emailInputElement!: ElementRef;
  @ViewChild('passwordInput') passwordInputElement!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    this.emailInputElement.nativeElement.focus();
  }

  focusPassword() {
    this.passwordInputElement.nativeElement.focus();
  }

  onSubmit(): void {
    if (this.authService.authenticate(this.email, this.password)) {
      this.router.navigate(['/rectangulos']);
    } else {
      alert('Invalid credentials');
    }
  }
}

