import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../model/products";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({providedIn: "root"})
export class ProductService{

    constructor(private http: HttpClient){ }

    createProduct(products: {pname: string, pdes: string, price: string}){
        const headers = new HttpHeaders({'myHeader': 'ssr'});
        console.log(products);
        this.http.post('https://angularfirstproject-458f1-default-rtdb.firebaseio.com/products.json',products, {'headers': headers})
        .subscribe((res) =>{
           console.log(res);
        });
    }

    fetchProduct() {
        return this.http.get<{ [key: string]: Product }>('https://angularfirstproject-458f1-default-rtdb.firebaseio.com/products.json')
            .pipe(map((res) => {
                const products = []
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        products.push({ ...res[key], id: key })
                    }
                }
                return products
            }))
    }

    deleteProduct(id: string){
        this.http.delete('https://angularfirstproject-458f1-default-rtdb.firebaseio.com/products/'+ id+'.json')
    .subscribe();
    }

    deleteAllProduct(){
        this.http.delete('https://angularfirstproject-458f1-default-rtdb.firebaseio.com/products.json')
    .subscribe();
    }

    updateProduct(id: string, value: Product){
        this.http.put('https://angularfirstproject-458f1-default-rtdb.firebaseio.com/products/'+ id+'.json', value)
        .subscribe();
    }
}