import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  categoryData: any[]= [];
  constructor(private apiService: ApiService, private router: Router){}
  
  ngOnInit(){
    this.apiService.apiData$.subscribe({
      next: (data) => {
        if (data) {
          this.categoryData = data;
        }
      }
    });
  }

  navigateToProductList(categoryId: number){
    this.router.navigate(['/products'],{
      queryParams: {
        categoryId: categoryId
      }
    })
  }
}
