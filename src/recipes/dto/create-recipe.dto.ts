export class CreateRecipeDto {
  title: string;
  ingredients: string[];
  instructions: string;
  description: string;
  saved_by: number;
  familyId?: number;
  mealType?: 'reggeli' | 'ebéd' | 'vacsora';
}
