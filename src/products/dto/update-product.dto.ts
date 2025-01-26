// update-product.dto.ts
export class UpdateProductDto {
  productName?: string;
  quantity?: number;
  unit?: string;
  expirationDate?: string;
  opened_date?: string;
  shelfId?: number;
}
