import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for stored user in localStorage on init
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): boolean {
    let user: User | null = null;

    if (username === 'admin' && password === 'adminpass') {
      user = { username: 'admin', role: 'admin' };
    } else if (username === 'user' && password === 'userpass') {
      user = { username: 'user', role: 'user' };
    }

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}