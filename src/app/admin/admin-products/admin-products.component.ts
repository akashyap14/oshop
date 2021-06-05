import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  
  products ;
  filteredProducts : any[]
  subcription : Subscription;
  //tableResource : DataTableResource<Product>;
  items : Product[] = [];
  itemCount : number;


  constructor(private productService : ProductService, private db : AngularFireDatabase) { 
    
    this.subcription = this.productService.getAll()
      .subscribe(products => {
         this.filteredProducts =  this.products = products;
         //this.initializeTable(products);
         
        });
  }

  filter(query : String){
    this.filteredProducts = (query) ?
     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
     this.products;
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }
  

}
