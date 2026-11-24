import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BaseResolver } from './base.resolver';
import { Iprod } from './shared/model/product';
import { ProductService } from './shared/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver extends BaseResolver<Iprod | Iprod[]> {
  private _prodServ = inject(ProductService)
  override resolveData(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iprod | Iprod[]> {
    let prodId = route.paramMap.get('id')

    if(prodId) {
      return this._prodServ.onEdit(prodId)
    }

    return this._prodServ.fetchProd()
  }
  
}
