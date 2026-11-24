import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Iprod } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {
  prodArr : Iprod [] = []
  prodId !: string
  product !: Iprod
  constructor(
    private _product : ProductService,
    private _routes : ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this._routes.data.subscribe(res => {
      if(res['product']) {
        this.prodArr = res['product']
      }
    })
    // this.getProduct()

    this._product.dataChanged$.subscribe(() => this.getProduct)
    this._routes.paramMap.subscribe(params => {
      this.prodId = params.get('pid')!

      this._product.onEdit(this.prodId).subscribe({
        next : res => {
          this.product = res
        },
        error : err => {
          console.log (err)
        }
      })
    })
    this._product.dataChanged$.subscribe(res => {
      if(res.action === 'Add'){
        this.prodArr.unshift(res.data)
      }
      else if (res.action === 'Update') {
        let index = this.prodArr.findIndex(k => k.pid === res.data.pid)
        this.prodArr[index] = res.data
        
      }else if (res.action === 'Remove') {
        let index= this.prodArr.findIndex(k => k.pid === res.data.pid)
        this.prodArr.splice(index , 1)
      }
    })
  }
  getProduct () {
    this.prodArr = []
    this._product.fetchProd()
    .subscribe ({
      next : res => {
        if(!res)
          return 
          for (const key in res) {
            this.prodArr.unshift({...res[key], pid: key })
          
        }

      },
      error : err => {
        console.log(err)
      }
    })
  }

  onProductDetails(pid : string, canReturnVal : number) {
    this._router.navigate([pid],
      {
        relativeTo : this._routes,
        queryParams : {
          canReturn : canReturnVal
        }
      }
    )
  }
}
