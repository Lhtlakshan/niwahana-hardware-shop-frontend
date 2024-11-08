import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent {
  orders:any=[];

  imagepath: string = "../../../images/productImg.png";
  
  constructor(private customerService:CustomerService){}

  ngOnInit(){
    this.getAllCustomerPlacedOrders();
  }

  getAllCustomerPlacedOrders(){
    this.orders = [];
    this.customerService.getPlacedOrdersByUserId().subscribe(res=>{
      Object.values(res).forEach(element=>{
        this.orders.push(element)
      })
      console.log(this.orders);
      
    })
  }
}
