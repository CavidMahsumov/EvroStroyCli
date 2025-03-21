import { Routes } from '@angular/router';
import { HomeComponent } from './ui/components/home/home.component';
import { RegisterComponent } from './ui/components/register/register.component';
import { LoginComponent } from './ui/components/login/login.component';
import { CatalogComponent } from './ui/components/catalog/catalog.component';
import { CatalogDetailComponent } from './ui/components/catalog-detail/catalog-detail.component';
import { ProductDetailComponent } from './ui/components/product-detail/product-detail.component';
import { CartComponent } from './ui/components/cart/cart.component';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { ProductComponent } from './admin/components/product/product.component';
import { OrderComponent } from './admin/components/order/order.component';
import { SettingsComponent } from './admin/components/settings/settings.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "catalog", component: CatalogComponent },
    { path: "catalog/:id", component: CatalogDetailComponent },
    { path: "product-detail/:id", component: ProductDetailComponent },
    { path: "cart", component: CartComponent },
    { path: "admin", component: AdminHomeComponent },
    {path:"admin/products",component:ProductComponent},
    {path:"admin/orders",component:OrderComponent},
    {path:"admin/settings",component:SettingsComponent},

    
];
