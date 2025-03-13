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
        const currentId = this.cartItems.getValue().findIndex(p => p.id === productId);
        if(currentId !== -1) {
            this.cartItems.getValue().splice(currentId, 1)
            this.cartItems.next([...currentCart])
        }
        localStorage.setItem('CART', JSON.stringify(this.cartItems.getValue()));

    }
}