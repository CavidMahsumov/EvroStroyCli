import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ApiService } from '../../../services/api-service';
import { Category } from '../../../../models/category.model';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../models/product.model';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  menuOpen = false;
  apicategories: Category[] = [];
  apiProducts: Product[] = [];
  isLogged:boolean=false;
  userEmail:string | null=null;
  showNotification = false;

  searchQuery: string = ''; // Axtarış dəyəri burada saxlanır

  
  categories = [
    {
      id:1,
      image: 'https://omid.az/upload/API/8f01df013de301332cc66d71ee73c5d6.jpg',
      title: 'İşıqlandırma',
      items: ['Aksesuarlar', 'Küçə işıqları', 'Spotlar']
    },
    {
      id:2,
      image: 'https://omid.az/upload/API/e6d83aeeb7bfa2bcc51c784b41c7dc93.jpg',
      title: 'Elektrik',
      items: ['Ölçü cihazları', 'Avtomat şalterlər', 'Tənzimləyicilər'],
      products: [
        { id: '1', name: 'NEOTEK Kabel H05VH', price: 2.35, stock: 600, image: 'assets/images/cable1.png' },
        { id: '2', name: 'ELEKTRİK Yuvası', price: 2.90, stock: 266, image: 'assets/images/socket1.png' }
      ]
    },
    {
      id:3,
      image: 'https://omid.az/upload/API/17bea30d4f752eb594fa0dc62ce090a7.jpg',
      title: 'Boya məhsulları',
      items: ['Boyacı alətləri', 'Macunlar', 'Pas təmizləyicilər']
    },
    {
      id:4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJ7RF8MhDFX5EKavTCyLgdxfRNvCTemUECA&s',
      title: 'İstilik və havalandırma',
      items: ['Baca aksesuarları', 'Elektrikli qızdırıcılar', 'Su qızdırıcıları']
    },
    {
      id:5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL8kXV7NXeyXBtDHfv7gIvJmDMvJvhcd1lJg&s',
      title: 'Məişət malları',
      items: ['Məişət texnikası', 'Xalçalar', 'Paltar qurutma']
    },
    { 
      id:6,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'Santexnika',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx']
    },
    { 
      id:7,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'Elektrik əl alətləri',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx']
    },
    { 
      id:8,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'Xırdavat və əl alətləri',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx']
    },
    { 
      id:9,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'İnşaat materialları',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx']
    },
    { 
      id:10,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'Divar Kağızları',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx']
    },
    { 
      id:11,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'Məişət texnikası',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx']
    },
    { 
      id:12,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'Bağ bağça',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx']
    }
  ];
  constructor(private authService:AuthService, private router:Router,private apiService:ApiService){}


  ngOnInit(){

    if(this.authService.isAuthenticated()){
      this.isLogged=true;
      this.userEmail=this.authService.getNameIdentifier();
      // console.log(this.userEmail)
    }
    else{
      this.isLogged=false;
    }

    this.apiService.getCategories().subscribe(response => {
      if (response.success) {
        // Process the categories
        this.apicategories = response.data.map((category: any) => ({
          id: category.categoryId,
          categoryName: category.categoryName,
          subCategories: category.subCategories || [],
          open: false
        }));
        // console.log(this.apicategories[0].subCategories[0].subcategoryId);
      }
    });
    this.apiService.getProducts().subscribe(response => {
      if (response.success) {
        // Process the categories
        this.apiProducts = response.data;
        
        // console.log();
      }
    });
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }
  goToCart(){
    this.router.navigate(["/cart"])
  }
  goToCategory(categoryId:any){
    this.router.navigate(["/catalog",categoryId])
  }
  getProductIdByName() {
    // console.log(this.apiProducts);
    const product = this.apiProducts.find(p => p.name.toLowerCase() === this.searchQuery.toLowerCase());
    return product ? product.categoryId : null;
  }

  filterProducts() {
    console.log('Filtr işləyir:', this.searchQuery);
    // Burada məhsulları filtr edə bilərsiniz
  }
  onSearch(event: Event) {
    const productCategorId=this.getProductIdByName();
    if(productCategorId==null){
      this.showNotification = true;

      setTimeout(() => {
        this.showNotification = false;
      },2000)
    }
    this.router.navigate(["/catalog",productCategorId]);
    event.preventDefault(); // Form-un səhifəni yeniləməsinin qarşısını alır
    // console.log('Axtarış sorğusu:', this.searchQuery);
    
    // Burada axtarış funksiyasını çağırın
  }
  logout(){
    this.authService.logout();
  }

}
