import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarCatalogComponent } from './components/car-catalog/car-catalog.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', component: LoginComponent },
  { 
    path: 'cars', 
    loadChildren: () => import('./car/car.module').then(m => m.CarModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'car-catalog', 
    component: CarCatalogComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }