import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Log the request for debugging
  console.log(`Making ${request.method} request to: ${request.url}`);
  
  // Add headers if needed
  const modifiedRequest = request.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      
      let errorMessage = 'An error occurred';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
        console.error('Client-side error:', error.error);
      } else {
        // Server-side error
        const status = error.status;
        const message = error.error?.message || error.message;
        
        switch (status) {
          case 0:
            errorMessage = 'Network error - unable to connect to server';
            console.error('Network error - check if backend is running');
            break;
          case 401:
            errorMessage = 'Unauthorized - please login again';
            console.error('Authentication error');
            break;
          case 403:
            errorMessage = 'Access forbidden';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Server error - please try again later';
            console.error('Server error:', message);
            break;
          default:
            errorMessage = message || `HTTP ${status} error`;
        }
      }
      
      // You can add a notification service here to show errors to users
      console.error('Error details:', {
        url: request.url,
        method: request.method,
        status: error.status,
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
      
      return throwError(() => new Error(errorMessage));
    })
  );
}; 