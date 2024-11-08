import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  analysis:any;
  constructor(private adminService:AdminService){}

  ngOnInit(){
    this.adminService.getOrderAnalytics().subscribe(res=>{
      console.log(res);
      this.analysis = res;
    })
  }
}
