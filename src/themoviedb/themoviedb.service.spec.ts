import { Test, TestingModule } from '@nestjs/testing';
import { ThemoviedbService } from './themoviedb.service';

describe('ThemoviedbService', () => {
  let service: ThemoviedbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemoviedbService],
    }).compile();

    service = module.get<ThemoviedbService>(ThemoviedbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
