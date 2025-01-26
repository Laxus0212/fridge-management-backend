export class UpdateRecipeDto {
  recipeName?: string;
  mealType?: 'reggeli' | 'ebéd' | 'vacsora';
  sharedWithFamily?: boolean;
}
