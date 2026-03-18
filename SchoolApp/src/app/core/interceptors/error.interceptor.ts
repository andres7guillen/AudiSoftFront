import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let message = 'Error inesperado';

      if (error.status === 400) {
        message = error.error;
      }

      if (error.status === 404) {
        message = error.error || 'No encontrado';
      }

      if (error.status === 500) {
        message = 'Error interno del servidor';
      }

      Swal.fire('Error', message, 'error');

      return throwError(() => error);
    }),
  );
};
