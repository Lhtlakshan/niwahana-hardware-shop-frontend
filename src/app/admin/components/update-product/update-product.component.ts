import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  productForm:FormGroup

  imagepath: string = "../../../images/cartImg.jpg";
  productId:any;
  
  listOfCategories:any=[];
  selectedFile: File | null;
  imagePreview:string | ArrayBuffer|null;

  constructor(private fb:FormBuilder,
    private router:Router,
    private adminService: AdminService,
    private activetedRoute:ActivatedRoute
  ){
    this.productId = this.activetedRoute.snapshot.params["product-id"];
  }

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
    this.getProductById()
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories = res;
    })
  }

  getProductById(){
    this.adminService.getProductById(this.productId).subscribe(res=>{
      this.productForm.patchValue(res);
    })
  }

  updateProduct(){
    if(this.productForm.valid){const formData:FormData = new FormData();
      formData.append('img',this.selectedFile);
      formData.append('categoryId',this.productForm.get('categoryId').value);
      formData.append('name',this.productForm.get('name').value);
      formData.append('description',this.productForm.get('description').value);
      formData.append('price',this.productForm.get('price').value);

      this.adminService.updateProduct(this.productId,formData).subscribe((res)=>{
        if(res.id != null){
            this.router.navigateByUrl("admin/adminDashboard");
          }else{ 
            alert("Product not updated...")
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
