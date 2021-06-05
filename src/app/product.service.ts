import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db : AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product)
  }

  /*getAll(){
    this.db.list('/products').snapshotChanges();
  }*/

  getAll() {  
    return this.db.list('/products')
        .snapshotChanges()    
        .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() as {} }))));
  }

  get(productID){
    return this.db.object('/products/' + productID).valueChanges();
  }

  update(productID,product){
    return this.db.object('/products/' + productID).update(product);
  }

  delete(productID){
    return this.db.object('/products/' + productID).remove();
  }
}
