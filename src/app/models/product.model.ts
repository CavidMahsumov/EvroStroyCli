export interface Product {
    id: string;
    name: string;
    description: string;
    marka: string; // `marka` sahəsini əlavə etdik
    categoryId: number;
    subCategoryId: number;
    subCategoryName?:string
    price: number;
    rating: number; // `rating` sahəsini əlavə etdik
    quantity: number;
    costPrice: number; // `costPrice` sahəsini əlavə etdik
    hasStock: boolean; // `hasStock` sahəsini əlavə etdik
    imageUrl: string;
    saleCount:number;
    file:File
  }
  