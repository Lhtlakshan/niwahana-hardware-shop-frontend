import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  imagepath: string = "../../../images/imgSignup.jpg";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Use AuthService here
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const password = this.signupForm.get('password')?.value;
    const confirm_password = this.signupForm.get('confirm_password')?.value;

    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      res => {
        alert("Signup successfully done...")
        this.router.navigateByUrl("login");
      },
      err => {
        alert("Signup failed, please try again...");
      }
    );
  }
}
