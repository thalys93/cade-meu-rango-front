import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            systemCheck: jest
              .fn()
              .mockResolvedValue('Vogue Backend is running!'),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return system check message', async () => {
      expect(await appController.getHello()).toBe(
        'Vogue Backend is running!',
      );
    });
  });
});
