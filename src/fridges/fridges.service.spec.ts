import { Test, TestingModule } from '@nestjs/testing';
import { FridgesService } from './fridges.service';

describe('FridgesService', () => {
  let service: FridgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FridgesService],
    }).compile();

    service = module.get<FridgesService>(FridgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
