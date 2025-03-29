import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

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
}
