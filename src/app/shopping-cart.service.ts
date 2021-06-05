import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/products';
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';
import {map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  

  constructor(private db : AngularFireDatabase) { 
    
  }

  private create(){
    return this.db.list('/shopping-carts/').push({
      dateCreated : new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(map((x: any) => {
        return new ShoppingCart(x.payload.val().items);
      }));
  }

  async addToCart(product : Product){
    this.updateCart(product,1);
    
  }

  async removeFromCart(product : Product){
    this.updateCart(product,-1);
  }

  async clearCart(){
    const cartId = await this.getOrCreateCartId(); 
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async getOrCreateCartId() : Promise<string>{
    let cartId = localStorage.getItem('cartId');
   
    if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId',result.key)
    return result.key; 
  
  }

  private getItem(cartId : string,productId : string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateCart(product : Product, change : number){
    const cartId = await this.getOrCreateCartId(); 
    const item$ = this.getItem(cartId,product.key);
    
    item$.snapshotChanges()
      .pipe(take(1))
      .subscribe(i => {  
        let quantity = ((i.payload.hasChild('quantity')) ? i.payload.val()['quantity'] + change : 1);
        if(quantity===0) item$.remove();
        else item$.update({
          title : product.title,
          imageUrl : product.imageUrl,
          price : product.price,
          quantity: quantity
        });
      });
  }


}
