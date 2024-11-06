import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {
 
  categoryForm:FormGroup

  constructor(private fb:FormBuilder,
    private router:Router,
    private adminService: AdminService
  ){}

  ngOnInit(){
    this.categoryForm = this.fb.group({
      name: [null,[Validators.required]],
      description:[null,[Validators.required]]
    })
  }

  addCategory(){
    if(this.categoryForm.valid){
      this.adminService.addCategory(this.categoryForm.value).subscribe(
        (res)=>{
          if(res != null){
            this.router.navigateByUrl("admin/adminDashboard");
          }else{
            alert("Category cannot be added. Please try again...");
          }
        }
      )
    }
  }
}
