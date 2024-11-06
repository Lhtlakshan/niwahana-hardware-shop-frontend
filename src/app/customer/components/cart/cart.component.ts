import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart:any[] = [];
  order:any;

  constructor(private customerService:CustomerService
    ,private fb:FormBuilder
  ){}

  ngOnInit(){
    this.getCart();
  }

  getCart(){
    this.cart = [];
    this.customerService.getCartByUserId().subscribe(res=>{
      this.order = res;
      console.log(this.order);
      
      res.cartItems.forEach(element => {
        this.cart.push(element);
      });
      console.log(this.cart);
      
    })
    
  }

  // getAllProducts(){
  //   this.products = [];
  //   this.customerService.getAllProducts().subscribe(res=>{
  //     Object.values(res).forEach(element=>{
  //       this.products.push(element)
  //     })
  //     console.log(this.products);
      
  //   })
  // }


}
