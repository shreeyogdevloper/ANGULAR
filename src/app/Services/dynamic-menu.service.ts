import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface MenuItem {
  title: string;
  route: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DynamicMenuService {
  private menuItems: MenuItem[] = [
    { title: 'Home', route: '/home', roles: ['user', 'admin'] },
    { title: 'Car Management', route: '/cars', roles: ['admin'] },
    { title: 'Profile', route: '/profile', roles: ['user', 'admin'] }
  ];

  private menuSubject = new BehaviorSubject<MenuItem[]>([]);
  menu$ = this.menuSubject.asObservable();

  updateMenu(userRole: string) {
    const filteredMenu = this.menuItems.filter(item => item.roles.includes(userRole));
    this.menuSubject.next(filteredMenu);
  }
}