import { Component, OnInit } from '@angular/core';
import { FilterProductComponent } from "../filter-product/filter-product.component";
import { ApiService } from '../../../service/api.service';
import { ProductCardComponent } from "./product-card/product-card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NoProductComponent } from "../no-product/no-product.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FilterProductComponent,
    ProductCardComponent,
    NgxPaginationModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    NoProductComponent
],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  products: any[] = [];
  currentPage = 1; // Initial page
  itemsPerPage = 8;
  totalPages: number = 1;
  totalItems!: number;
  showPagination: boolean = true;
  sortOptions = [
    { label: 'Price: High to Low', value: 'high-to-low' },
    { label: 'Price: Low to High', value: 'low-to-high' },
    { label: 'Name: A to Z', value: 'name-asc' },
    { label: 'Name: Z to A', value: 'name-desc' }
  ];
  selectedSort = 'high-to-low';
  tempPage!: number ;
  isLoading: boolean = true;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      this.productList(categoryId);
    });
  }

  productList(id: number){
    this.isLoading = true;
    this.apiService.getAllProductsByCategory(id).subscribe((response: any) => {
      if(Array.isArray(response)){
        this.isLoading = false;
      this.products = response || [];
      this.totalItems = response.length;
      this.calculateTotalPages();
      }
    })
  }

  sortProducts() {
    switch (this.selectedSort) {
      case 'high-to-low':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'low-to-high':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'name-asc':
        this.products.sort((a, b) => a?.category?.name.localeCompare(b?.category?.name));
        break;
      case 'name-desc':
        this.products.sort((a, b) => b?.category?.name.localeCompare(a?.category?.name));
        break;
    }
  }

  calculateTotalPages(): void {
    if (this.totalItems && this.itemsPerPage) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      if (this.totalPages > 1) {
        this.showPagination = true;
      } else {
        this.showPagination = false;
      }
    } else {
      this.totalPages = 1;
      this.showPagination = false;
    }
    this.updateInput();
  }

  // Update input to reflect currentPage/totalPages
  updateInput(): void {
    this.tempPage = this.currentPage;
  }

  // Handle the "Previous" button click
  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateInput();
    }
  }

  // Handle the "Next" button click
  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateInput();
    }
  }

  // Handle manual page input only on Enter press
  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const inputVal = (event.target as HTMLInputElement).value; 
      const page = parseInt(inputVal, 10); 

      if (!isNaN(page) && page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updateInput();
      } else {
        this.updateInput(); 
      }
    }
  }
}
