import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl:'./dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string ="Save";
  constructor(private formBuilder : FormBuilder,   
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any ,
    private dailogRef : MatDialogRef<DialogComponent>){ 

    }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      Comment : ['', Validators.required],
      date : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update"; 
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(responce)=>{
            alert("Product add succesfully")
            this.productForm.reset();
            this.dailogRef.close('Save');
          },
          error:()=>{
            alert('Failed to add product');
          }
        })
      }
    }
    else{
      this.updateProduct();
    }
    this.getAllProduct();
  }
  getAllProduct() {
    throw new Error('Method not implemented.');
  }
  
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:()=>{
        alert("success");
        this.productForm.reset();
        this.dailogRef.close('update');
      },
      error:()=>{
        alert("failed");
      }
    })
  }
}

