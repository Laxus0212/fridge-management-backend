export class CreateRecipeDto {
  recipeName: string;
  mealType: 'reggeli' | 'ebéd' | 'vacsora';
  saved_by: number;
  sharedWithFamily?: boolean;
}
