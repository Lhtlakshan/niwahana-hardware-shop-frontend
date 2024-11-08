import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.css'
})
export class PostCouponComponent {
  couponForm:FormGroup

    imagepath: string = "../../../images/coupon.png"

  constructor(private fb:FormBuilder,
    private router:Router,
    private adminService: AdminService
  ){}

  ngOnInit(){
    this.couponForm = this.fb.group({
      name: [null,[Validators.required]],
      code:[null,[Validators.required]],
      discount:[null,[Validators.required]],
      expirationDate:[null,[Validators.required]]
    })
  }

  addCoupon(){
    if(this.couponForm.valid){
      this.adminService.addCoupon(this.couponForm.value).subscribe(
        (res)=>{
          if(res != null){
            alert("Coupon added successfully");
            this.router.navigateByUrl("/admin/adminDashboard");
          }else{
            alert("Category cannot be added. Please try again...");
          }
        }
      )
    }
  }
}
