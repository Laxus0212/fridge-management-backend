import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { IngredientDto } from './dto/ingredient.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':recipeId')
  async findOne(@Param('recipeId') recipeId: number) {
    const recipe = await this.recipesService.findOne(recipeId);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }
    return recipe;
  }

  @Put(':recipeId')
  update(
    @Param('recipeId') recipeId: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(recipeId, updateRecipeDto);
  }

  @Delete(':recipeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('recipeId') recipeId: number) {
    return this.recipesService.remove(recipeId);
  }

  @Post(':recipeId/ingredients')
  @HttpCode(HttpStatus.CREATED)
  addIngredientToRecipe(
    @Param('recipeId') recipeId: number,
    @Body() ingredientDto: IngredientDto,
  ) {
    return this.recipesService.addIngredientToRecipe(recipeId, ingredientDto);
  }

  @Delete(':recipeId/ingredients/:ingredientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeIngredientFromRecipe(
    @Param('recipeId') recipeId: number,
    @Param('ingredientId') ingredientId: number,
  ) {
    return this.recipesService.removeIngredientFromRecipe(
      recipeId,
      ingredientId,
    );
  }
}
