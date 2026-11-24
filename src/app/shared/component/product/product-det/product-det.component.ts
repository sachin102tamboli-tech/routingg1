import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { pid } from 'process';
import { Iprod, IprodData } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-product-det',
  templateUrl: './product-det.component.html',
  styleUrls: ['./product-det.component.scss']
})
export class ProductDetComponent implements OnInit {
  product !: Iprod
  prodId !: string
  constructor(
    private _router : Router,
    private _routes : ActivatedRoute,
    private _product : ProductService,
    private _matDialog : MatDialog,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.fetchProd()
  }
  fetchProd () { 
    this._routes.paramMap
    .subscribe((param ) =>{
      this.prodId = param.get('id') as string
    
    if(this.prodId){
      this._product.onEdit(this.prodId)
      .subscribe (res => {
        this.product = res
      })
    }
    })
  }

  gotoEdit(){
    this._router.navigate(['edit'], {
      queryParamsHandling : "preserve",
      relativeTo : this._routes
    })
  }

  onRemove(id : string){
    let config = new MatDialogConfig
    config.data = `Are you sure you want to delete product with product id ${id}?`
    config.width = '450px'
    config.maxWidth = '500px'
    config.disableClose = true
    let _matRef = this._matDialog.open(GetConfirmComponent, config)
    _matRef.afterClosed().pipe(
                filter(res => res),
                switchMap(() => this._product.onRemove(this.prodId))
    )
    .subscribe ({
      next : res => {
        this._router.navigate(['product'])
        this.product.pid = this.prodId
        let obj : IprodData = {
          action : 'Remove',
          data : this.product
        }
        this._product.productData(obj)
        this._snackbar.snackbar('Record removed successfully')
      }, 
      error : err => {
        this._snackbar.snackbar(err)
      }
    })
  }
}
