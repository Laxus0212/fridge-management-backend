// create-product.dto.ts
export class CreateProductDto {
  productName: string;
  quantity: number;
  unit: string;
  expirationDate: string;
  opened_date?: string;
  shelfId: number;
}
