import { Product } from "./product.model";
import { SubCategory } from "./subcategory.model";

export interface Category {
  id: number;
  categoryName: string;
  products: Product[];
  subCategories: SubCategory[];
  open: boolean;
}
