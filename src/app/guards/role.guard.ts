import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && expectedRoles.includes(currentUser.role)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}