import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './ui/components/home/home.component';
import { HeaderComponent } from './ui/components/home/header/header.component';
import { FooterComponent } from './ui/components/home/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './commonService/auth-interceptor.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-Commerce-ClientSide';
}
