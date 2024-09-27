// File: src/app/services/notification.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  showError(message: string): void {
    console.error('Error:', message);
    // Replace with a proper UI notification in a real application
    alert('Error: ' + message);
  }

  showSuccess(message: string): void {
    console.log('Success:', message);
    // Replace with a proper UI notification in a real application
    alert('Success: ' + message);
  }
}