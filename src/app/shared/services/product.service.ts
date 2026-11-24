import { Injectable } from '@angular/core';
import { Iprod, IprodData } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';




 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  prodArr : Iprod[] = []
  BASE_URL = environment.BASE_URL
  POST_URL = `${this.BASE_URL}/product.json`

  private dataChangeSub$ = new Subject<IprodData>()
  dataChanged$ = this.dataChangeSub$.asObservable()
  constructor(
    private _http : HttpClient
  ) { }

  productData (dat : IprodData) {
    this.dataChangeSub$.next(dat)
  }

  fetchProd () : Observable<Iprod[]> {
    return this._http.get<any>(this.POST_URL)
    .pipe (
      map(res => {
        
      })
    )
  }

  addProd (product : Iprod) : Observable<{name : string}> { 
    return this._http.post<any>(this.POST_URL, product)
  }

  onEdit(id : string) : Observable<Iprod> {
    let EDIT_URL = `${this.BASE_URL}/product/${id}.json`
    return this._http.get<Iprod>(EDIT_URL)
  }

  onUpdate (updatedObj : Iprod) : Observable<any> {
    let UPDATE_URL = `${this.BASE_URL}/product/${updatedObj.pid}.json`
    return this._http.patch<any>(UPDATE_URL, updatedObj)
  }

  onRemove (id : string) : Observable <any> {
    let REMOVE_URL = `${this.BASE_URL}/product/${id}.json`
    return this._http.delete(REMOVE_URL)
  }
}
