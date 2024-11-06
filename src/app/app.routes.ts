import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/components/customer-dashboard/customer-dashboard.component';
import { PostCategoryComponent } from './admin/components/post-category/post-category.component';
import { PostProductComponent } from './admin/components/post-product/post-product.component';
import { CartComponent } from './customer/components/cart/cart.component';

export const routes: Routes = [
    {
        path:"signup",
        component:SignupComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"admin/adminDashboard",
        component:AdminDashboardComponent
    },
    {
        path:"customer/customerDashboard",
        component:CustomerDashboardComponent
    },
    {
        path:"admin/add-category",
        component : PostCategoryComponent
    },
    {
        path:"admin/add-product",
        component:PostProductComponent
    },
    {
        path:"customer/cart",
        component:CartComponent
    }
];
