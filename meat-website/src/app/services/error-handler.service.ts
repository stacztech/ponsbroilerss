import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ErrorInfo {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorsSubject = new BehaviorSubject<ErrorInfo[]>([]);
  public errors$ = this.errorsSubject.asObservable();

  constructor() {}

  addError(message: string, details?: any) {
    const error: ErrorInfo = {
      message,
      type: 'error',
      timestamp: new Date(),
      details
    };
    
    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, error]);
    
    console.error('Error logged:', error);
  }

  addWarning(message: string, details?: any) {
    const warning: ErrorInfo = {
      message,
      type: 'warning',
      timestamp: new Date(),
      details
    };
    
    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, warning]);
    
    console.warn('Warning logged:', warning);
  }

  addInfo(message: string, details?: any) {
    const info: ErrorInfo = {
      message,
      type: 'info',
      timestamp: new Date(),
      details
    };
    
    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, info]);
    
    console.log('Info logged:', info);
  }

  clearErrors() {
    this.errorsSubject.next([]);
  }

  getErrors(): ErrorInfo[] {
    return this.errorsSubject.value;
  }

  // Helper method to handle API connection errors
  handleApiError(error: any, context: string = 'API') {
    let message = 'An error occurred';
    
    if (error.status === 0) {
      message = 'Unable to connect to server. Please check your internet connection.';
    } else if (error.status === 401) {
      message = 'Session expired. Please login again.';
    } else if (error.status === 500) {
      message = 'Server error. Please try again later.';
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }
    
    this.addError(`${context}: ${message}`, error);
  }
} 