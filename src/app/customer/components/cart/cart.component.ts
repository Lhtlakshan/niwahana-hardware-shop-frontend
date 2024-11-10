import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { NgFor, NgIf } from '@angular/common';
import { Router} from '@angular/router';

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
    ,private fb:FormBuilder,private router:Router
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
      console.log(this.order.discount);
      res.cartItems.forEach(element => {
        this.cart.push(element);
      });
      console.log(this.cart); 
    }) 
  }

  increaseQty(productId:any){
    this.customerService.increaseProductQty(productId).subscribe(res=>{
      alert("Increased the product by 1");
      this.getCart();
    })
  }

  placeOrder(){
    this.router.navigateByUrl("customer/place-order");
  }
}
