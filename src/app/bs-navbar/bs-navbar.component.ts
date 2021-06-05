import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import {Observable} from 'rxjs';
import firebase from 'firebase/app';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  
  user$ : Observable<firebase.User>;
  appUser : AppUser;
  navbarOpen = false;
  cart$ : Observable<ShoppingCart>

  constructor(public afAuth: AngularFireAuth, private auth : AuthService, private shoppingCartService : ShoppingCartService) { 
    //this.user$ = afAuth.authState; 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
  }

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();

  }

  logout(){
      this.auth.logout();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  

}
