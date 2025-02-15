import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCart();
  }

  cleanImageUrl(image: string[]): string[] {
    if (!image || !Array.isArray(image)) return [];

    return image.map(img=>img.replace(/^\[\"|\"\]$/g, ''));
  }

  loadCart() {
    this.cartItems = this.apiService.getCartItems().map(item => {
      return {
        ...item,
        cleanedImages: this.cleanImageUrl(item.images)
      };
    });
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log(this.totalAmount);
    
  }

  increaseQuantity(productId: number) {
    this.apiService.increaseQuantity(productId);
    this.loadCart();
  }

  decreaseQuantity(productId: number) {
    this.apiService.decreaseQuantity(productId);
    this.loadCart();
  }

  removeItem(productId: number) {
    this.apiService.removeFromCart(productId);
    this.loadCart();
  }

  checkout() {
    alert("Proceeding to checkout!");
  }
}
