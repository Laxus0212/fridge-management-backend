import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus, Put, Delete, Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get(':userId/favorites')
  @HttpCode(HttpStatus.OK)
  getUserFavorites(@Param('userId') userId: number) {
    return this.recipesService.getUserRecipes(userId);
  }

  @Get(':userId/favorites/family/:familyId')
  @HttpCode(HttpStatus.OK)
  getFamilyShared(
    @Param('familyId') familyId: number,
    @Param('userId') userId: number,
  ) {
    return this.recipesService.getFamilySharedRecipes(familyId, userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateDto);
  }

  @Delete(':userId/favorites')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFromFavorites(
    @Param('userId') userId: number,
    @Query('recipeId') recipeId: number,
  ) {
    return this.recipesService.remove(+recipeId);
  }
}
