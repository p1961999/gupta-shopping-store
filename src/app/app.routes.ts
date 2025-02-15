import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product/product-details/product-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrdersComponent } from './component/orders/orders.component';
import { AuthGuard } from '../app/auth.guard';
import { CartComponent } from './component/cart/cart.component';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  
  {
    path: 'products',
    component: ProductListComponent, // Show all products
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent, // Show product details
  },

  {
    path: 'cart',
    component: CartComponent, // Shopping Cart
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard], // Protected Route - Only Logged-in Users
  },

  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard], // Protected Route
  },

  {
    path: 'users',
    loadChildren: () =>
      import('../app/component/auth/users-routing').then(
        (m) => m.USERS_ROUTES
      ),
  },

  {
    path: '**',
    redirectTo: 'home', // Redirect unknown paths to home
  },
];
