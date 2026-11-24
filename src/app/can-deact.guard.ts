import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ICanDeactivate } from './shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class CanDeactGuard implements CanDeactivate<ICanDeactivate> {
  canDeactivate(
    component: ICanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.CanDeactivate();
  }
  
}
