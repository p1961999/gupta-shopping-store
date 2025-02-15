import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-navigation-modal',
  standalone: true,
  imports: [MatIconModule, NgClass, TitleCasePipe],
  templateUrl: './navigation-modal.component.html',
  styleUrl: './navigation-modal.component.scss'
})
export class NavigationModalComponent {
  menuOpen: boolean = false;
  profileMenuOpen: boolean = false;
  delayTimer: any = null;
  name: string = '';
  isLoggedIn: boolean = false;
  allCategories: any[]=[];
  cartCount = 0;
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    private apiService: ApiService
  ){
    this.getCategories();
  }

  ngOnInit(){
    this.apiService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  keepProfileMenuOpen() {
    this.profileMenuOpen = true;
  }

  showProfileMenu() {
    this.name = localStorage.getItem('user') 
      ? JSON.parse(localStorage.getItem('user')!).name 
      : null;
    this.profileMenuOpen = !this.profileMenuOpen;
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  hideProfileMenu() {
    this.profileMenuOpen = false;
    this.delayTimer = setTimeout(() => {
    }, 300);
  }

  navigateToLogin(){
    this.router.navigate(['/users/login'])
  }

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
  }

  isLoginOrSignupPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/login') || currentUrl.includes('/signup');
  }

  getCategories(){
    this.apiService.getCategoriesList().subscribe((res: any)=>{
      this.allCategories = res;
      this.apiService.setCategoryData(this.allCategories);
    })
  }

  navigateToHome(){
    this.router.navigate(['/home'])
  }

  navigatoToProductList(id: number){
    this.router.navigate(['/products'],{
      queryParams: {
        categoryId: id
      }
    })
  }
}
