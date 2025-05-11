export class CreateRecipeDto {
  title: string;
  ingredients: string[];
  instructions: string;
  description: string;
  savedBy: number;
  familyId?: number;
  mealType?: 'reggeli' | 'ebéd' | 'vacsora';
}
