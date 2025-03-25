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
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CustomersComponent } from './admin/components/customers/customers.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "catalog", component: CatalogComponent },
    { path: "catalog/:id", component: CatalogDetailComponent },
    { path: "product-detail/:id", component: ProductDetailComponent },
    { path: "cart", component: CartComponent },

    // Admin panelləri üçün Guard-lar əlavə olundu
    { path: "admin", component: AdminHomeComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: "admin/products", component: ProductComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: "admin/orders", component: OrderComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: "admin/settings", component: SettingsComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: "admin/customers", component: CustomersComponent, canActivate: [AuthGuard, AdminGuard] },

];
