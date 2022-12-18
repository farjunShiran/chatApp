import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.isLoggedIn().pipe(
      tap((userIsLoggedIn) => {
        console.log(userIsLoggedIn);
        if (!userIsLoggedIn) this.router.navigate(['/']);
      })
    );
  }
}
