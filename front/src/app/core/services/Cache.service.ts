import { Injectable } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CacheService {
    cartItems = new BehaviorSubject<Product[]>([]);
    cartItems$ = this.cartItems.asObservable();

    cartChanges = this.cartItems.asObservable();
    
    addToCart(product: Product){
        const currentCart = this.cartItems.getValue();
        const updatedCart = [...currentCart, product];
        this.cartItems.next(updatedCart);
        localStorage.setItem('CART', JSON.stringify(this.cartItems.getValue()));
    }

    removeFromCart(productId: number) {
        const currentCart = this.cartItems.getValue();
        const updatedCart = currentCart.filter(p => p.id !== productId);
        this.cartItems.next(updatedCart)
        localStorage.setItem('CART', JSON.stringify(updatedCart));
    }

    getCart(){
        const storedProducts = localStorage.getItem('CART');
        return storedProducts ? JSON.parse(storedProducts) : [];
    }

    isInCart(productId: number): boolean {
        return this.cartItems.getValue().some(item => item.id === productId);
      }
}