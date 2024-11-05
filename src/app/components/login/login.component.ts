import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  imagepath: string = "../../../images/imgLogin.jpg";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitLogin(): void {
  const username = this.loginForm.get('email')?.value;
  const password = this.loginForm.get('password')?.value;

  this.authService.login(username, password).subscribe(
    (res) => {
      console.log(UserStorageService.getUserRole());
      
      if (UserStorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl("admin/adminDashboard");
      } else if (UserStorageService.isCustomerLoggedIn()) {
        this.router.navigateByUrl("customer/customerDashboard");
      }
    },
    (err) => {
      if (err.status === 401) {
        alert("Incorrect username or password. Please try again.");
      } else {
        console.error("An unexpected error occurred:", err);
        alert("Login failed, please try again...");
      }
    }
  );
}
}
