import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', }])
  ]
})
export class LoginModule { }