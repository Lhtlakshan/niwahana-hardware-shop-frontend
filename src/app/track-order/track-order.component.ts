import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent {

  searchOrderForm:FormGroup;
  order:any;

  constructor(private fb:FormBuilder,
    private authService:AuthService){ }

  
    ngOnInit(){
      this.searchOrderForm= this.fb.group({
        trackingId:[null,Validators.required]
      })
    }

    submitForm(){
      this.authService.getOrdeByTrackingId(this.searchOrderForm.get('trackingId').value).subscribe(res=>{
        console.log(res);
        this.order = res;
      })
    }
}
