import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storedEmail: string = 'veraby2003';
  private storedPassword: string = '123';

  constructor() { }

  authenticate(email: string, password: string): boolean {
    return email === this.storedEmail && password === this.storedPassword;
  }
}
