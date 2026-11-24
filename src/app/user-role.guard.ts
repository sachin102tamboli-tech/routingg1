import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  private _authService = inject(AuthService)
  private _router = inject(Router) 
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let userRole : string = this._authService.getUserRole() as string
    
    let roles : string[] = route.data['roles']
    
    if(userRole && roles && roles.includes(userRole)){

      return true;
    }
    return this._router.createUrlTree([''])

    // return roles.includes(userRole)
  }
  
}
