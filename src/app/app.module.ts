import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import firebase from "firebase/app";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import {BsNavbarComponent} from './bs-navbar/bs-navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import {AuthGuard} from './auth-guard.service';
import {UserService} from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import {ShoppingCartService} from './shopping-cart.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {CategoryService} from './category.service';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    CustomFormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule ,// storage
    AngularFireDatabaseModule,
    NgbDropdownModule,
    RouterModule.forRoot(
      [
        { path : '', component : ProductsComponent},
        { path : 'products', component : ProductsComponent},
        { path : 'login', component : LoginComponent},
        { path : 'shopping-cart', component : ShoppingCartComponent},

        { path : 'check-out', component : CheckOutComponent , canActivate : [AuthGuard]},
        { path : 'order-success/:id', component : OrderSuccessComponent , canActivate : [AuthGuard]},
        { path : 'my/orders', component : MyOrdersComponent , canActivate : [AuthGuard]},
        { 
          path : 'admin/products/new', 
          component : ProductFormComponent , 
          canActivate : [AuthGuard,AdminAuthGuard]
        } ,
        { 
          path : 'admin/products/:id', 
          component : ProductFormComponent , 
          canActivate : [AuthGuard,AdminAuthGuard]
        } ,
        { 
          path : 'admin/product', 
          component : AdminProductsComponent , 
          canActivate : [AuthGuard,AdminAuthGuard]
        } ,
        { 
          path : 'admin/products/new', 
          component : ProductFormComponent , 
          canActivate : [AuthGuard,AdminAuthGuard]
        } ,
        { path : 'admin/orders',
          component : AdminOrdersComponent,
          canActivate : [AuthGuard,AdminAuthGuard]
        }
      ]
    ),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    NgbDropdownModule,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
