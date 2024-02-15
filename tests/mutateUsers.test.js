import request from 'supertest-graphql';
import gql from 'graphql-tag';
import dbHandler from './dbHandler.js';
import app from '../app.js';

describe('User mutation', () => {
  beforeAll(async () => await dbHandler.connect());

  afterAll(async () => await dbHandler.closeDatabase());

  it('should mutate users', async () => {
    const { data } = await request
      .default(app)
      .mutate(
        gql`
          mutation {
            userCreate(email: "Ost@mail.net", password: "sdfsdfs") {
              _id
              email
              password
            }
          }
        `
      )
      .expectNoErrors();

    expect(data.userCreate)
      .toHaveProperty('_id')
      .toHaveProperty('email', 'Ost@mail.net')
      .toHaveProperty('password', null)
      .not.toHaveProperty('ownedRealestates');

    expect(await dbHandler.getUserById(data.userCreate._id)).toBeTruthy();
  });
});
