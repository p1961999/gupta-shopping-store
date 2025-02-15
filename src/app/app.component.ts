import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationModalComponent } from "./component/navigation-modal/navigation-modal.component";
import { FooterComponent } from "./component/footer/footer.component";
import { CartComponent } from "./component/cart/cart.component";
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationModalComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gupta-shopping-store';

  constructor(private authService: AuthService){}

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }
}
