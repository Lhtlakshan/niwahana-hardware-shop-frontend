import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [NgFor],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css'
})
export class CouponsComponent {
  coupons:any=[];

  imagepath: string = "../../../images/productImg.png";
  
  constructor(private adminService:AdminService
    
  ){}

  ngOnInit(){
    this.getAllCoupons();
  }

  getAllCoupons(){
    this.coupons = [];
    this.adminService.getAllCoupons().subscribe(res=>{
      Object.values(res).forEach(element=>{
        this.coupons.push(element)
      })
      console.log(this.coupons);
      
    })
  }

}
