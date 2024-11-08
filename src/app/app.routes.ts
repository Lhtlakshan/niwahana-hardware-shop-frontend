import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/components/customer-dashboard/customer-dashboard.component';
import { PostCategoryComponent } from './admin/components/post-category/post-category.component';
import { PostProductComponent } from './admin/components/post-product/post-product.component';
import { CartComponent } from './customer/components/cart/cart.component';
import { PostCouponComponent } from './admin/components/post-coupon/post-coupon.component';
import { CouponsComponent } from './admin/components/coupons/coupons.component';
import { PlaceOrderComponent } from './customer/components/place-order/place-order.component';
import { OrdersComponent } from './admin/components/orders/orders.component';
import { CustomerOrdersComponent } from './customer/components/customer-orders/customer-orders.component';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path:"home",
        component:HomeComponent
    },
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
    },
    {
        path:"admin/add-coupon",
        component:PostCouponComponent
    },
    {
        path:"admin/coupons",
        component:CouponsComponent
    },
    {
        path:"customer/place-order",
        component:PlaceOrderComponent
    },
    {
        path:"admin/placed-orders",
        component:OrdersComponent
    },
    {
        path:"customer/placed-orders",
        component:CustomerOrdersComponent
    },
    {
        path:"admin/update-product/:product-id",
        component:UpdateProductComponent
    }
];
