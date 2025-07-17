import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight: string;
  isCombo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private apiUrl = 'http://localhost:9000/api/cart';

  private buyNowItem: CartItem | null = null;

  constructor(private http: HttpClient) {
    this.fetchCart();
  }

  public fetchCart() {
    this.http.get<any>(`${this.apiUrl}/`, { withCredentials: true }).subscribe({
      next: (res) => {
        this.cartItems = (res.cart?.items || []).map((item: any) => ({ ...item, id: item.id }));
        this.cartItemsSubject.next(this.cartItems);
        console.log('CartService fetchCart:', this.cartItems);
      },
      error: () => {
        this.cartItems = [];
        this.cartItemsSubject.next(this.cartItems);
        console.log('CartService fetchCart (error):', this.cartItems);
      }
    });
  }

  public clearCartItems() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  addToCart(item: CartItem) {
    this.http.post<any>(`${this.apiUrl}/add`, item, { withCredentials: true }).subscribe(res => {
      this.cartItems = (res.cart?.items || []).map((i: any) => ({ ...i, id: i.id }));
      this.cartItemsSubject.next(this.cartItems);
      console.log('CartService addToCart:', this.cartItems);
    });
  }

  updateQuantity(itemId: string, quantity: number) {
    this.http.post<any>(`${this.apiUrl}/update`, { id: itemId, quantity }, { withCredentials: true }).subscribe(res => {
      this.cartItems = (res.cart?.items || []).map((i: any) => ({ ...i, id: i.id }));
      this.cartItemsSubject.next(this.cartItems);
      console.log('CartService updateQuantity:', this.cartItems);
    });
  }

  removeFromCart(itemId: string) {
    this.http.post<any>(`${this.apiUrl}/remove`, { id: itemId }, { withCredentials: true }).subscribe(res => {
      this.cartItems = (res.cart?.items || []).map((i: any) => ({ ...i, id: i.id }));
      this.cartItemsSubject.next(this.cartItems);
      console.log('CartService removeFromCart:', this.cartItems);
    });
  }

  clearCart() {
    this.http.post<any>(`${this.apiUrl}/clear`, {}, { withCredentials: true }).subscribe(res => {
      this.cartItems = [];
      this.cartItemsSubject.next(this.cartItems);
    });
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartItemsCount(): number {
    return this.cartItems.length;
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Save a pending cart item to localStorage for deferred add-to-cart
  public savePendingCartItem(item: CartItem) {
    localStorage.setItem('pendingCartItem', JSON.stringify(item));
  }

  // Retrieve and clear the pending cart item from localStorage
  public getAndClearPendingCartItem(): CartItem | null {
    const itemStr = localStorage.getItem('pendingCartItem');
    if (itemStr) {
      localStorage.removeItem('pendingCartItem');
      return JSON.parse(itemStr);
    }
    return null;
  }

  // Call this after login to process any pending cart item
  public processPendingCartItem() {
    const item = this.getAndClearPendingCartItem();
    if (item) {
      this.addToCart(item);
    }
  }

  public setBuyNowItem(item: CartItem) {
    this.buyNowItem = item;
    localStorage.setItem('buyNowItem', JSON.stringify(item));
  }

  public getBuyNowItem(): CartItem | null {
    if (this.buyNowItem) return this.buyNowItem;
    const itemStr = localStorage.getItem('buyNowItem');
    if (itemStr) {
      this.buyNowItem = JSON.parse(itemStr);
      return this.buyNowItem;
    }
    return null;
  }

  public clearBuyNowItem() {
    this.buyNowItem = null;
    localStorage.removeItem('buyNowItem');
  }
}
