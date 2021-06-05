import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart : ShoppingCart;

  shipping = {
    name : "",
    addressLine1 : "",
    addressLine2 : "",
    city : ""
  }; 
  userSubscription : Subscription;
  user : string;

  constructor(
    private authService : AuthService,
    private router : Router,
    private orderService : OrderService) { }

  async ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.user = user.uid)
  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.user,this.shipping,this.cart)
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);

  }  



}
