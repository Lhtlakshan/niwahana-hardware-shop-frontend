import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [NgFor , RouterLink , ReactiveFormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

  products:any[]=[];
  searchProduct:FormGroup;
  imagepath: string = "../../../images/productImg.png";

  constructor(private customerService:CustomerService
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
    this.customerService.getAllProducts().subscribe(res=>{
      Object.values(res).forEach(element=>{
        this.products.push(element)
      })
      console.log(this.products);
      
    })
  }

  submitSearch(){
    this.products = [];
    const name = this.searchProduct.get('productName').value;
    this.customerService.getAllProductsByName(name).subscribe(res=>{
      Object.values(res).forEach(element=>{
        this.products.push(element)
      })
    })
  }

  addToCart(id:any){
    this.customerService.addToCart(id).subscribe(res=>{
      alert("Product added to cart successfully");
    })
  }
}
