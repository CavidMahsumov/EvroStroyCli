import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from '../home/footer/footer.component';
import { CommonModule } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CatalogComponent {
  categories = [
    {
      id:1,
      image: 'https://omid.az/upload/API/8f01df013de301332cc66d71ee73c5d6.jpg',
      title: 'İşıqlandırma',
      items: ['Aksesuarlar', 'Küçə işıqları', 'Spotlar'],
      open:false
    },
    {
      id:2,
      image: 'https://omid.az/upload/API/e6d83aeeb7bfa2bcc51c784b41c7dc93.jpg',
      title: 'Elektrik',
      items: ['Ölçü cihazları', 'Avtomat şalterlər', 'Tənzimləyicilər'],  
      products: [
        { id: '1', name: 'NEOTEK Kabel H05VH', price: 2.35, stock: 600, image: 'assets/images/cable1.png' },
        { id: '2', name: 'ELEKTRİK Yuvası', price: 2.90, stock: 266, image: 'assets/images/socket1.png' }
      ],
      open:false
    },
    {
      id:3,
      image: 'https://omid.az/upload/API/17bea30d4f752eb594fa0dc62ce090a7.jpg',
      title: 'Boya məhsulları',
      items: ['Boyacı alətləri', 'Macunlar', 'Pas təmizləyicilər'],
      open:false
    },
    {
      id:4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJ7RF8MhDFX5EKavTCyLgdxfRNvCTemUECA&s',
      title: 'İstilik və havalandırma',
      items: ['Baca aksesuarları', 'Elektrikli qızdırıcılar', 'Su qızdırıcıları'],
      open:false
    },
    {
      id:5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL8kXV7NXeyXBtDHfv7gIvJmDMvJvhcd1lJg&s',
      title: 'Məişət malları',
      items: ['Məişət texnikası', 'Xalçalar', 'Paltar qurutma'],
      open:false
    },
    { 
      id:6,
      image: 'https://omid.az/upload/API/05b36d911dc5870ccf619ea9261f59a7.jpg',
      title: 'Santexnika',
      items: ['Su fitriləri', 'Boru və fitinqlər', 'Hamam və mətbəx'],
      open:false
    }
  ];
  
  ngAfterViewInit(){
    let categoryCards = document.querySelectorAll('.category-card');
    console.log(categoryCards);
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        console.log('Category Card Clicked!');
      });
    });
  }


  ngOnInit() {
    console.log('Categories:', this.categories); // Konsolda çıxmalıdır
  }
  
  constructor(private router: Router) {}

  // Yeni klik metodu
  onCategoryClick(categoryId: number) {
    this.router.navigate(['/catalog', categoryId]);
  }
  toggleCategory(category: any) {
    console.log("Sakan")
    category.open = !category.open;
  }
}
