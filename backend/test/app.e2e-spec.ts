import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { appConfig } from './../src/config/app.config';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(`api/${appConfig.apiVersion}`);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it(`/api/${appConfig.apiVersion}/system-check (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/api/${appConfig.apiVersion}/system-check`)
      .expect(200);
  });
});
