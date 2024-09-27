import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icar } from '../Models/icar';
import { CarService } from '../Services/carser.service';
import { NotificationService } from '../Services/notification.service';
import { modelCodeValidator } from '../directives/model-code-validator.directive';







@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Icar[] = [];
  carForm: FormGroup;
  isEditing = false;
  showModal = false;
  errorMessage: string = '';
  selectedFiles: File[] = [];
  searchTerm: string = '';

  



  constructor(
    private carService: CarService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.carForm = this.fb.group({
      modelCode: ['', [Validators.required, modelCodeValidator()]],
      id: [null],
      brand: ['', Validators.required],
      class: ['', Validators.required],
      modelName: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      dateOfManufacturing: [null, Validators.required],
      active: [false],
      sortOrder: [null, [Validators.required, Validators.min(0)]],
      images: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe(
      (cars) => {
        this.cars = cars;
      },
      (error) => {
        console.error('Error loading cars:', error);
        this.errorMessage = 'Failed to load cars. Please try again later.';
      }
    );
  }
  
  openModal(car?: Icar): void {
    this.showModal = true;
    if (car) {
      this.isEditing = true;
      this.carForm.patchValue({
        ...car,
        images: car.images.join(','),
      });
      this.selectedFiles = [];
    } else {
      this.isEditing = false;
      this.carForm.reset();
      
      
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 16); 
      this.carForm.patchValue({
        dateOfManufacturing: formattedDate, 
      });
  
      this.selectedFiles = [];
    }
  }
  
  

  closeModal(): void {
    this.showModal = false;
    this.carForm.reset();
    this.selectedFiles = [];
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    this.selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        this.selectedFiles.push(file);
      } else {
        this.notificationService.showError(`File ${file.name} exceeds 5MB limit`);
      }
    }
   
    this.carForm.patchValue({
      images: this.selectedFiles.map(file => file.name).join(',')
    });
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    
    this.carForm.patchValue({
      images: this.selectedFiles.map(file => file.name).join(',')
    });
  }

  // 
  
  onSubmit(): void {
    if (this.carForm.valid) {
      const carData: Icar = this.carForm.value;
      
      carData.images = this.selectedFiles.map(file => file.name); 
  
      if (this.isEditing) {
        this.updateCar(carData);
      } else {
        carData.id = 0; 
        this.addCar(carData);
      }
    }
  }
  
  
  
  addCar(carData: Icar): void {
    this.carService.addCar(carData, this.selectedFiles).subscribe(
      (newCar) => {
        this.notificationService.showSuccess('New car added successfully');
        this.loadCars();
        this.closeModal();
      },
      (error) => {
        this.notificationService.showError('Failed to add car');
        console.error('Error adding car:', error);
      }
    );
  }

  updateCar(carData: Icar): void {
    this.carService.updateCar(carData, this.selectedFiles).subscribe(
      () => {
        this.notificationService.showSuccess('Car updated successfully');
        this.loadCars();
        this.closeModal();
      },
      (error) => {
        this.notificationService.showError('Failed to update car');
        console.error('Error updating car:', error);
      }
    );
  }
  

  deleteCar(id: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).subscribe(
        () => {
          this.notificationService.showSuccess('Car deleted successfully');
          this.loadCars();
        },
        (error) => {
          this.notificationService.showError('Failed to delete car');
          console.error('Error deleting car:', error);
        }
      );
    }
  }

  brands = ['Audi', 'Jaguar', 'Land Rover', 'Renault'];
  carClasses = ['A-Class', 'B-Class', 'C-Class'];

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.carService.searchCars(this.searchTerm).subscribe(
        (cars) => {
          this.cars = cars;
        },
        (error) => {
          console.error('Error searching cars:', error);
          this.notificationService.showError('Failed to search cars. Please try again.');
        }
      );
    } else {
      this.loadCars();
    }
  }
  

  onSort(sortBy: string): void {
    this.carService.sortCars(sortBy).subscribe(
      (cars) => {
        this.cars = cars;
      },
      (error) => {
        console.error('Error sorting cars:', error);
        this.notificationService.showError('Failed to sort cars. Please try again.');
      }
    );
  }
}
