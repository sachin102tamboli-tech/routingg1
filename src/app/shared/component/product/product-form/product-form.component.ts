import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICanDeactivate, Iprod, IprodData } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, ICanDeactivate {
  isInEditMode : boolean = false
  product !: Iprod
  prodId !: string
  productForm !: FormGroup
  editId !: string
  constructor(
    private _product : ProductService,
    private _reouter : Router,
    private _routes : ActivatedRoute,
    private _snackbar : SnackbarService
  ) { }
  CanDeactivate() {
    if(this.isInEditMode && this.productForm.dirty){
      // this._snackbar.snackbar('Please save the previous record then try to edit other data!!')
      let conf = confirm('Are you sure you want to discard the changes??')
      return conf
    }
  
      return true
    
  }

  ngOnInit(): void {
    this.creatForm()
    this.onEdit()
  }
   creatForm() {
    this.productForm = new FormGroup({
      pname: new FormControl(null),
      pstatus: new FormControl('In-Progress'),
      canReturn: new FormControl(null)
    })
  }

  onSubmit(){
    if(this.productForm.valid) {
      let product :Iprod= this.productForm.value
      this._product.addProd(product)
      .subscribe ({
        next : res =>{
          this.productForm.reset()
          this._snackbar.snackbar(`Product ${product.pname} is added successfully!!!`)
          this._reouter.navigate(['product'], {queryParams : {refresh : Date.now()}})
          product.pid=res['name']
          let obj : IprodData = {
            action : 'Add',
            data : product
          }
          
          this._product.productData(obj)
        },
        error : err => {
          this._snackbar.snackbar(err)
        }
      })
    }
  }

  onEdit(){
    this.editId = this._routes.snapshot.params['id']
    if(this.editId){
      this.isInEditMode = true
      this._product.onEdit(this.editId).subscribe(res => {
        this.product = res 
        this.productForm.patchValue(this.product)
      })
    }
  }

  onUpdate(){
    if(this.productForm.valid) {
      let updatedObj = {...this.productForm.value, pid : this.editId}
      // this.product.pid = this.editId
      this._product.onUpdate(updatedObj)
      .subscribe ({
        next : res => {
          this.productForm.reset()
          this._reouter.navigate(['product'])
          this.isInEditMode = false
          let obj : IprodData = {
            action : 'Update',
            data : updatedObj
          } 
          this._product.productData(obj)
          this._snackbar.snackbar(`Product ${updatedObj.pname} is updated successfully!!!`)
        },
        error : err =>{
          this._snackbar.snackbar(err)
        }
      })
    }
  }
}
