import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  addCategory(categoryDto:any):Observable<any>{
    return this.http.post(BASIC_URL + "admin/category" , categoryDto,{
      headers:this.createAuthorizationHeader()
    })
  }

  getAllCategories(){
    return this.http.get(BASIC_URL + "admin/categories" ,{
      headers:this.createAuthorizationHeader()
    })
  }

  addProduct(productDto:any):Observable<any>{
    return this.http.post(BASIC_URL + "admin/product" , productDto,{
      headers:this.createAuthorizationHeader()
    })
  }

  getAllProducts():Observable<any>{
    return this.http.get(BASIC_URL + "admin/products" ,{
      headers:this.createAuthorizationHeader()
    })
  }

  getAllProductsByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL + `admin/products/search/${name}` ,{
      headers:this.createAuthorizationHeader()
    })
  }

  deleteProduct(id:any):Observable<any>{
    return this.http.delete(BASIC_URL + `admin/product/delete/${id}` ,{
      headers:this.createAuthorizationHeader()
    })
  }
  
  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + UserStorageService.getToken()
    )
  }
  }
