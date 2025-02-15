import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgGenericPipe } from 'ng-generic-pipe';
import { ApiService } from '../../../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgGenericPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any; // Receive product data
  isHovered: boolean = false;
  currentImageIndex: number = 0;
  imageInterval: any;
  cleanedImageUrl: string[] = [];
  quantity: number = 0;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.cleanedImageUrl = this.cleanImageUrl(this.product?.images);
    this.updateQuantity();
  }

  cleanImageUrl(image: string[]): string[] {
    if (!image || !Array.isArray(image)) return [];

    return image.map(img=>img.replace(/^\[\"|\"\]$/g, ''));
  }

  truncateText(text: string, limit: number = 25): string {
    if (!text) return ''; // Handle empty values
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  updateQuantity() {
    const cart = this.apiService.getCartItems();
    const cartItem = cart.find(item => item.id === this.product.id);
    this.quantity = cartItem ? cartItem.quantity : 0;
  }

  addToBag(product: any) {
    const cart = this.apiService.getCartItems();
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 }); // ✅ Assigns a default quantity
    }

    this.apiService.updateCart(cart);
    this.updateQuantity();
}

  increaseQuantity() {
    const cart = this.apiService.getCartItems();
    const product = cart.find(item => item.id === this.product.id);

    if (product) {
      product.quantity += 1;
      this.apiService.updateCart(cart);
      this.updateQuantity();
    }
  }

  decreaseQuantity() {
    let cart = this.apiService.getCartItems();
    const product = cart.find(item => item.id === this.product.id);

    if (product) {
      product.quantity -= 1;
      if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== this.product.id); // Remove from cart
      }
      this.apiService.updateCart(cart);
      this.updateQuantity();
    }
  }

  

  navigateToDetail(id: number){
    this.router.navigate([`products/${id}`]);
  }
}
