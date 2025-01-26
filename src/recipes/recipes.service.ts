import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './models/recipe.model';
import { Ingredient } from './models/ingredient.model';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { IngredientDto } from './dto/ingredient.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe)
    private readonly recipeModel: typeof Recipe,
    @InjectModel(Ingredient)
    private readonly ingredientModel: typeof Ingredient,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipeModel.create(
      createRecipeDto as Partial<CreateRecipeDto>,
    );
    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.findAll({ include: [Ingredient] });
  }

  async findOne(recipeId: number): Promise<Recipe> {
    const recipe = await this.recipeModel.findByPk(recipeId, {
      include: [Ingredient],
    });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }
    return recipe;
  }

  async update(
    recipeId: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.findOne(recipeId);
    await recipe.update(updateRecipeDto);
    return recipe;
  }

  async remove(recipeId: number): Promise<void> {
    const recipe = await this.findOne(recipeId);
    await recipe.destroy();
  }

  async addIngredientToRecipe(
    recipeId: number,
    ingredientDto: IngredientDto,
  ): Promise<Ingredient> {
    const recipe = await this.findOne(recipeId);
    const ingredient = await this.ingredientModel.create({
      ...ingredientDto,
      recipeId: recipe.recipeId,
    });
    return ingredient;
  }

  async removeIngredientFromRecipe(
    recipeId: number,
    ingredientId: number,
  ): Promise<void> {
    const ingredient = await this.ingredientModel.findOne({
      where: { ingredientId, recipeId },
    });
    if (!ingredient) {
      throw new NotFoundException(
        `Ingredient with ID ${ingredientId} not found in recipe ${recipeId}`,
      );
    }
    await ingredient.destroy();
  }
}
