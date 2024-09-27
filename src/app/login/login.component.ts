import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']   
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      const user = this.authService.getCurrentUser();
      if (user?.role === 'admin') {
        this.router.navigate(['/cars']);
      } else {
        this.router.navigate(['/car-catalog']);
      }
    } else {
      alert('Invalid credentials');
    }
  }
}
