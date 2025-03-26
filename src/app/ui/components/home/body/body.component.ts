import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../../models/product.model';
import { ApiService } from '../../../services/api-service';
import { Category } from '../../../../models/category.model';


@Component({
  selector: 'app-body',
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  changeDetection:ChangeDetectionStrategy.Default
})
export class BodyComponent implements AfterViewInit {
 products: Product[] = [];
 apicategories: Category[] = [];
 showNotification = false;


  ngAfterViewInit() {
    // Bootstrap karuselini manuel başlatmak için
    const carouselElement = document.querySelector('#carouselExample');
    if (carouselElement) {
      
    }
  }
  ngOnInit(){
    this.apiService.getCategories().subscribe(response => {
      if (response.success) {
        // API-dən gələn categoryId sahəsini id sahəsinə map edirik 
        this.apicategories = response.data.map((category:any) => ({
          id: category.categoryId, // Backend categoryId göndərir, biz isə id-ə çeviririk
          categoryName: category.categoryName,
          subCategories: category.subCategories
        }));
  
        // console.log('Mapped Categories:', this.apicategories); // Nəticəni yoxlayın
      }
    });
  
    this.apiService.getProducts().subscribe(response => {
      this.products = response.data; 
      // console.log('Products loaded:', this.products);
    
      if (!Array.isArray(this.products)) {
        console.error('Error: products is not an array!', this.products);
        return;
      }
    
    
    });
   
  }
  fursetler = [
    { 
      title: 'Divar kağızlarına MEGA endirim',
      date: '07.05.2024 - 31.10.2024',
      description: 'Divar kağızlarına mega endirim',
      image: 'https://valyuta.az/file/articles/2024/12/12/1733977852_endirim9.png'
    },
    { 
      title: 'Çilçıraq festivalı 2024',
      date: '24.05.2024 - 30.09.2024',
      description: 'Çilçıraq festivalı 2024',
      image: 'https://valyuta.az/file/articles/2024/12/12/1733977852_endirim9.png'
    },
    { 
      title: 'Stokları bitiririk - Outlet məhsulları',
      date: '04.06.2024 - 31.12.2024',
      description: 'Outlet məhsulları',
      image: 'https://valyuta.az/file/articles/2024/12/12/1733977852_endirim9.png'
    }
  ];

  blogs = [
    {
      image: 'https://m.media-amazon.com/images/I/816wmdlb1wL.jpg',
      title: 'Divar boyamadan öncə bunları edin',
      description: '5 məqama diqqət yetirməkdə fayda var'
    },
    {
      image: 'https://botanicah.com.au/cdn/shop/products/image_8244d8f1-e1b0-4cd0-8ea8-fe394252e966.jpg?v=1631005947&width=1445',
      title: 'Bitkiləriniz üçün ideal dibçək',
      description: 'Dibçək alarkən bunlara diqqət edin'
    }
  ];

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
    }
  ];
  constructor(private router: Router,private apiService:ApiService){}

  slides = [
    { src: 'https://cdn.pixabay.com/photo/2015/08/23/09/22/banner-902589_640.jpg', alt: 'Slide 1' },
    { src: 'https://cdn.pixabay.com/photo/2016/11/27/08/19/logo-1862301_640.png', alt: 'Slide 2' },
    { src: 'https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467_1280.jpg', alt: 'Slide 3' }
  ];

  goToCatalogDetail(){
    this.router.navigate(['/catalog', 1]);
  }
  onCategoryClick(categoryId: number) {
    // console.log("Salam")
    this.router.navigate(['/catalog', categoryId]);
  }
  goToProductDetail(productId:string){
    this.router.navigate(["/product-detail",productId])
  }

}

// slides = [
//   { src: "https://cdn.pixabay.com/photo/2015/08/23/09/22/banner-902589_640.jpg", alt: 'Slayt 1' },
//   { src: 'https://cdn.pixabay.com/photo/2016/11/27/08/19/logo-1862301_640.png', alt: 'Slayt 2' },
//   { src: 'https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467_1280.jpg', alt: 'Slayt 3' }
// ];


