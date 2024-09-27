import { Component, OnInit } from '@angular/core';
import { CarService } from '../../Services/carser.service';
import { Icar } from '../../Models/icar';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-car-catalog',
  templateUrl: './car-catalog.component.html',
   styleUrls: ['./car-catalog.component.css'],
  providers: [CurrencyPipe]
})
export class CarCatalogComponent implements OnInit {
  cars: Icar[] = [];
  filteredCars: Icar[] = [];
  searchTerm: string = '';

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe(
      (cars) => {
        this.cars = cars;
        this.filteredCars = cars; // initialize filtered cars
      },
      (error) => {
        console.error('Error loading cars:', error);
      }
    );
  }

  filterCars() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCars = this.cars.filter(car =>
      car.modelName.toLowerCase().includes(term) ||
      car.brand.toLowerCase().includes(term)
    );
  }
}
