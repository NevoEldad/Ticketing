import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123'
    })
    .expect(400);
});

it('returns a 400 with an missing password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('dissallows duplicate email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('Sets cookie after a succesful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'testtest'
    })
    .expect(201);

  expect(request.agent('Set-Cookie')).toBeDefined();
});
