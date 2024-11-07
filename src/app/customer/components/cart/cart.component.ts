import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart:any[] = [];
  order:any;

  couponForm: FormGroup

  constructor(private customerService:CustomerService
    ,private fb:FormBuilder
  ){}

  ngOnInit(){
    this.couponForm = this.fb.group({
      code:[null,[Validators.required]]
    })
    this.getCart();
  }

  applyCoupon(){
    this.customerService.applyCoupon(this.couponForm.get(['code']).value).subscribe(res=>{
      alert("Coupon applied successfully");
      this.getCart();
    },err=>{
      alert("Cannot apply coupon");
    })
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
}
