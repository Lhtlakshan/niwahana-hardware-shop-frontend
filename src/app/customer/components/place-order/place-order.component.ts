import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  orderForm:FormGroup

  constructor(private fb:FormBuilder,
    private router:Router,
    private customerService: CustomerService
  ){}

  ngOnInit(){
    this.orderForm = this.fb.group({
      address: [null,[Validators.required]],
      description:[null,[Validators.required]]
    })
  }

  placeOrder(){
    if(this.orderForm.valid){
      this.customerService.placeOrder(this.orderForm.value).subscribe(
        (res)=>{
          if(res != null){
            this.router.navigateByUrl("customer/my-order");
          }else{
            alert("Order cannot be created. Please try again...");
          }
        }
      )
    }
  }
}
