export class CreateShoppingListDto {
  name: string;
  ownerId: number;
  familyId?: number; // Opcionális, ha a lista megosztva van a családdal
}
