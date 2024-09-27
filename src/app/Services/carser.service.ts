import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icar } from '../Models/icar';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://localhost:7147/api/Car';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Icar[]> {
    return this.http.get<Icar[]>(this.apiUrl);
  }

  getCar(id: number): Observable<Icar> {
    return this.http.get<Icar>(`${this.apiUrl}/${id}`);
  }

  addCar(car: Icar, images: File[]): Observable<Icar> {
    const formData = new FormData();
    Object.keys(car).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, (car as any)[key]);
      }
    });
    images.forEach((image) => formData.append('images', image, image.name));
    return this.http.post<Icar>(this.apiUrl, formData);
  }

  updateCar(car: Icar, images: File[]): Observable<any> {
    const formData = new FormData();
    Object.keys(car).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, (car as any)[key]);
      }
    });
    images.forEach((image) => formData.append('images', image, image.name));
    return this.http.put(`${this.apiUrl}/${car.id}`, formData);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCars(searchTerm: string): Observable<Icar[]> {
    return this.http.get<Icar[]>(`${this.apiUrl}/search?searchTerm=${searchTerm}`);
  }

  sortCars(sortBy: string): Observable<Icar[]> {
    return this.http.get<Icar[]>(`${this.apiUrl}/sort?sortBy=${sortBy}`);
  }
}