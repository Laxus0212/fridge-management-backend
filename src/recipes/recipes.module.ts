import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe } from './models/recipe.model';
import { Ingredient } from './models/ingredient.model';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, Ingredient])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
