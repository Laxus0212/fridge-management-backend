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
import { FridgesService } from './fridges.service';
import { CreateFridgeDto } from './dto/create-fridge.dto';
import { UpdateFridgeDto } from './dto/update-fridge.dto';

@Controller('fridges')
export class FridgesController {
  constructor(private readonly fridgesService: FridgesService) {}

  @Post()
  create(@Body() createFridgeDto: CreateFridgeDto) {
    return this.fridgesService.create(createFridgeDto);
  }

  @Get()
  findAll() {
    return this.fridgesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const fridge = await this.fridgesService.findOne(+id);
    if (!fridge) {
      throw new NotFoundException(`Fridge with ID ${id} not found`);
    }
    return fridge;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFridgeDto: UpdateFridgeDto) {
    return this.fridgesService.update(+id, updateFridgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fridgesService.remove(+id);
  }

  @Get(':ownerId/user-fridges')
  getFridgesByOwnerId(@Param('ownerId') ownerId: string) {
    return this.fridgesService.getFridgesByOwnerId(Number.parseInt(ownerId));
  }
  @Get(':familyId/family-fridges')
  getFridgesByFamilyId(@Param('familyId') familyId: string) {
    return this.fridgesService.getFridgesByFamilyId(Number.parseInt(familyId));
  }
}
