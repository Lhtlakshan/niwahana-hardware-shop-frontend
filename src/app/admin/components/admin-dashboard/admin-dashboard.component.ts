import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor , RouterLink , ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  products:any=[];
  searchProduct:FormGroup;

  constructor(private adminService:AdminService
    ,private fb:FormBuilder
  ){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProduct = this.fb.group({
      productName:[null,[Validators.required]]
    })
  }

  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe(res=>{
      Object.values(res).forEach(element=>{
        this.products.push(element)
      })
      console.log(this.products);
      
    })
  }

  submitSearch(){
    this.products = [];
    const name = this.searchProduct.get('productName').value;
    this.adminService.getAllProductsByName(name).subscribe(res=>{
      Object.values(res).forEach(element=>{
        this.products.push(element)
      })
    })
  }

  deleteProduct(productId:any){
    this.adminService.deleteProduct(productId).subscribe(res=>{
      if (res && (res.status === 200 || res.status === 204)) {
        alert("Product deleted successfully...");
      } else {
        alert("Try again");
      }
    },
    err => {
      console.error("Error deleting product:", err);
      alert("An error occurred. Please try again.");
    })
  }
}
