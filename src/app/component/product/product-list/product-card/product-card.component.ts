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
    this.quantity = this.apiService.getProductQuantity(this.product.id);
  }

  addToBag(product: any) {
    this.apiService.addToCart(product);
    this.updateQuantity();
  }

  increaseQuantity() {
    this.apiService.increaseQuantity(this.product.id);
    this.updateQuantity();
  }

  decreaseQuantity() {
    this.apiService.decreaseQuantity(this.product.id);
    this.updateQuantity();
  }

  navigateToDetail(id: number){
    this.router.navigate([`products/${id}`]);
  }

  isProductInCart(productId: number): boolean {
    const cart = this.apiService.getCartItems();
    return cart.some(item => item.id === productId && item.quantity > 0);
  }
}
