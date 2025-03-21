import { CartItemDto } from "./cartItemDto";

export interface Order {
    orderId: string;              
    cartId: number;          
    orderDate: Date;         
    location: string;        
    userId: string;          
    phoneNumber: string;     
    notification: string;    
    totalAmount: number;     
    isSuccess: boolean;      
    cartItemDtos: CartItemDto[];
  }
  