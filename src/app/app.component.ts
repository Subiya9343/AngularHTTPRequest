import { Component, ViewChild } from '@angular/core';
import { Product } from './model/products';
import { ProductService } from './Services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularHTTPRequest';
  allProducts: Product[]=[];
  isFetching: boolean = false;
  currentProduct: Product;
  editMode: boolean = false;
  currentProductId: string;
  errorMessage: string = null;

  @ViewChild('productsForm') form: NgForm

  constructor(private productService: ProductService){ }

  ngOnInit(){
    this.fetchProducts();
  }

  onProductsFetch(){
    this.fetchProducts();
  }

  OnProductCreate(products: {pname: string, pdes: string, price: string}){
    if(!this.editMode)
      this.productService.createProduct(products)
    else
      this.productService.updateProduct(this.currentProductId, products)
  }

  private fetchProducts(){
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) =>{
       this.allProducts= products;
       this.isFetching = false;
    }
    ,(err)=>{
      this.errorMessage = err.message;
      // console.log(this.errorMessage);
    }
  )
  }
  productDelete(id: string){
    this.productService.deleteProduct(id);
  }
  onProductsClear(){
    this.productService.deleteAllProduct();
  }
  editProduct(id: string){
    this.currentProductId = id;
    //get a product based on id
    this.currentProduct = this.allProducts.find((editId) =>{
        return editId.id === id;
    })

    //populate a form with the product details
     this.form.setValue({
      pname: this.currentProduct.pname,
      pdes: this.currentProduct.pdes,
      price: this.currentProduct.price
     });

     //change the button to update button
     this.editMode = true;
  }
}
