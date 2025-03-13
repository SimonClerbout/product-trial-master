import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CacheService } from 'app/core/services/Cache.service';
import { Product } from 'app/products/data-access/product.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, DataViewModule, CardModule, ButtonModule, DialogModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cacheService = inject(CacheService);

  myCart: Product[] = [];

ngOnInit() {
  this.cacheService.cartItems.subscribe(cart => {
    this.myCart = cart;
  });
}

removeFromCart(productId: number) {
  this.cacheService.removeFromCart(productId)
}

}
