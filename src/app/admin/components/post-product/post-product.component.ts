import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { NgFor, NgIf } from '@angular/common';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf , NgFor],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.css'
})
export class PostProductComponent {
  productForm:FormGroup

  imagepath: string = "../../../images/cartImg.jpg";
  
  listOfCategories:any=[];
  selectedFile: File | null;
  imagePreview:string | ArrayBuffer|null;

  constructor(private fb:FormBuilder,
    private router:Router,
    private adminService: AdminService
  ){}

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload=()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(){
    this.productForm = this.fb.group({
      categoryId: [null,[Validators.required]],
      name: [null,[Validators.required]],
      price: [null,[Validators.required]],
      description:[null,[Validators.required]]
    })

    this.getAllCategories()
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories = res;
    })
  }

  addProduct(){
    if(this.productForm.valid){
      const formData:FormData = new FormData();
      formData.append('img',this.selectedFile);
      formData.append('categoryId',this.productForm.get('categoryId').value);
      formData.append('name',this.productForm.get('name').value);
      formData.append('description',this.productForm.get('description').value);
      formData.append('price',this.productForm.get('price').value);

      this.adminService.addProduct(formData).subscribe((res)=>{
          if(res.id != null){
            this.router.navigateByUrl("admin/adminDashboard");
          }
      })
    }else{
      for (const i in this.productForm.controls ){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
