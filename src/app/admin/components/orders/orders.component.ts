import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders:any=[];
  
  constructor(private adminService:AdminService
    
  ){}

  ngOnInit(){
    this.getAllPlacedOrders();
  }

  getAllPlacedOrders(){
    this.orders = [];
    this.adminService.getAllPlacedOrders().subscribe(res=>{
      Object.values(res).forEach(element=>{
        this.orders.push(element)
      })
      console.log(this.orders);
      
    })
  }

  changeOrderStatus(orderId:number,status:string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res=>{
      if(res != null){
        alert("Order status changed successfully...");
        this.getAllPlacedOrders();
      }else{
        alert("Something went wrong.");
      }
    })
  }

}
