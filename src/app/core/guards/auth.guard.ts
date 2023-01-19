import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private apiService: ApiService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       
            const currentUser = this.apiService.currentUserValue;
            if (currentUser && currentUser.email_verified==1) {
                // logged in so return true
                return true;
            }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login']);
        return false;
    }
}
