import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule, UserService } from '../src/users';

describe('testing API', () => {
  let app: INestApplication;
  const userService = { getUsers: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get All users', () => {
    return request(app.getHttpServer()).get('/api/user-info').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
