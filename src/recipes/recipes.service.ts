import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Recipe } from './models/recipe.model';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe)
    private readonly recipeModel: typeof Recipe,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { ingredients, ...data } = createRecipeDto;
    return this.recipeModel.create({
      ...data,
      ingredients: JSON.stringify(ingredients),
    });
  }

  async getUserRecipes(userId: number): Promise<Recipe[]> {
    return this.recipeModel.findAll({ where: { savedBy: userId } });
  }

  async getFamilySharedRecipes(
    familyId: number,
    userId: number,
  ): Promise<Recipe[]> {
    return this.recipeModel.findAll({
      where: {
        familyId,
        savedBy: { [Op.ne]: userId },
      },
    });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipeModel.findByPk(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async remove(id: number): Promise<void> {
    const recipe = await this.findOne(id);
    await recipe.destroy();
  }

  async update(id: number, updateDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.findOne(id);

    updateDto.familyId = updateDto.familyId || null;

    await recipe.update(updateDto);
    return recipe;
  }
}
