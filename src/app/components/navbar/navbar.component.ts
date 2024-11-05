import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();

  constructor(private router:Router){ }

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();   
    })
  }

  logout(){
     UserStorageService.signOut(); 
    this.router.navigateByUrl("login");
  }
}
