import { Component, HostListener } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoProductComponent } from "../no-product/no-product.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: any;
  selectedImage: string = '';
  cleanedImageUrl: any[]= [];
  isLoading: boolean= false;
  mrp: number = 0;
  selectedSize: any = null;
  sizes: any[] = [
    {label:'S', price: '850'}, 
    {label:'L', price: '860'},
    {label:'M', price: '870'},
    {label:'Xl', price: '900'}
  ];
  isAtBottom: boolean = false;
  lastScrollTop: number = 0;

  highlights: any[]=[
  ]
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isLoading = true;
      this.apiService.getProductById(productId).subscribe(data => {
        this.product = data;
        this.isLoading = false;
        this.cleanedImageUrl = this.cleanImageUrl(this.product?.images);
        this.selectedImage = this.cleanedImageUrl[0];
        this.highlights.push({key:'Description',value:this.product?.description})
        this.mrp = this.calculateMRP(this.product?.price);
      });
    }
  }

  selectSize(size: any) {
    this.selectedSize = size;
  }

  cleanImageUrl(image: string[]): string[] {
    if (!image || !Array.isArray(image)) return [];

    return image.map(img=>img.replace(/^\[\"|\"\]$/g, ''));
  }

  changeImage(image: string) {
    this.selectedImage = image;
  }

  calculateMRP(price: number): number {
    if (!price) return 0;
    return Math.round(price * 1.18); 
  }

  shareProduct() {
    const productUrl = window.location.href; // Get current URL
    if (navigator.share) {
      navigator.share({
        title: this.product?.title,
        text: 'Check out this product!',
        url: productUrl,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing not supported on this browser.');
    }
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    const scrollBottom = window.innerHeight + scrollTop;
    const documentHeight = document.body.offsetHeight;
    if (scrollTop < this.lastScrollTop) {
      this.isAtBottom = false;
    }
    else if (scrollBottom >= documentHeight - 100) {
      this.isAtBottom = true;
    } 

    // Update last scroll position
    this.lastScrollTop = scrollTop;
  }
}
