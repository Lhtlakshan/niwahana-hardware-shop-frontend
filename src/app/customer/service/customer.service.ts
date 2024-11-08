import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get(BASIC_URL + "customer/products" ,{
      headers:this.createAuthorizationHeader()
    })
  }

  getAllProductsByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL + `customer/products/search/${name}` ,{
      headers:this.createAuthorizationHeader()
    })
  }

  addToCart(productId:any):Observable<any>{
    const cartDto = {
      userId: UserStorageService.getUserId() ,
      productId: productId
       
    }
    return this.http.post(BASIC_URL + "customer/add-to-cart",cartDto ,{
      headers:this.createAuthorizationHeader()
    })
  }

  increaseProductQty(productId:any):Observable<any>{
    const cartDto = {
      userId: UserStorageService.getUserId() ,
      productId: productId   
    }
    return this.http.post(BASIC_URL + "customer/add-product",cartDto ,{
      headers:this.createAuthorizationHeader()
    })
  }

  getCartByUserId():Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `customer/get-cart/${userId}` ,{
      headers:this.createAuthorizationHeader()
    })
  }

  getPlacedOrdersByUserId():Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `customer/placed-orders/${userId}` ,{
      headers:this.createAuthorizationHeader()
    })
  }

 applyCoupon(code:any):Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `customer/coupon/${userId}/${code}` ,{
      headers:this.createAuthorizationHeader()
    })
  }

  placeOrder(orderDto:any):Observable<any>{
    orderDto.userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + "customer/place-order",orderDto ,{
      headers:this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + UserStorageService.getToken()
    )
  }
}
