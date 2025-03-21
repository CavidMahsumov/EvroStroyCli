import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [CommonModule,FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    siteLogo: string = 'assets/logo.png';
    companyName: string = 'Mənim Saytım';
    companyAddress: string = 'Bakı, Azərbaycan';
    companyPhone: string = '+994 50 123 45 67';

    constructor(private router:Router){};
  
    editField(field: 'companyName' | 'companyAddress' | 'companyPhone' | 'siteLogo') {
        if (field === 'siteLogo') {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.onchange = (event: any) => {
            this.updateLogo(event);
          };
          fileInput.click();
        } else {
            const newValue = prompt(`Yeni ${field} daxil edin:`, this[field] as string);
            if (newValue !== null && newValue.trim() !== '') {
              this[field] = newValue as any;
          }
        }
      }
      
    updateLogo(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.siteLogo = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    goToHome(){
        this.router.navigate(["/admin"])
    }
    goToProducts(){
        this.router.navigate(["/admin/products"])
    }
    goToOrders(){
        this.router.navigate(["/admin/orders"])
    }
  
}
