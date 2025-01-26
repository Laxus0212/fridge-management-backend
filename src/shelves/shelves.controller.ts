import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Controller('shelves')
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Post()
  create(@Body() createShelfDto: CreateShelfDto) {
    return this.shelvesService.create(createShelfDto);
  }

  @Get()
  findAll() {
    return this.shelvesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shelf = await this.shelvesService.findOne(+id);
    if (!shelf) {
      throw new NotFoundException(`Shelf with ID ${id} not found`);
    }
    return shelf;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShelfDto: UpdateShelfDto) {
    return this.shelvesService.update(+id, updateShelfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shelvesService.remove(+id);
  }

  @Get(':fridgeId/user-shelves')
  getShelvesByFridgeId(@Param('fridgeId') fridgeId: string) {
    return this.shelvesService.getShelvesByFridgeId(+fridgeId);
  }
}
