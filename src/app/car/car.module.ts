// File: src/app/car/car.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { ModelCodeValidatorDirective } from '../directives/model-code-validator.directive';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    CarComponent,
    ModelCodeValidatorDirective,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarRoutingModule,
    MaterialModule
    
  ]
})
export class CarModule { }