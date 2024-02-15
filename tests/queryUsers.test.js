import request from 'supertest-graphql';
import gql from 'graphql-tag';
import dbHandler from './dbHandler.js';
import app from '../app.js';

describe('GET', () => {
  beforeAll(async () => await dbHandler.connect());

  afterAll(async () => await dbHandler.closeDatabase());

  it('should get users', async () => {
    const { data } = await request
      .default(app)
      .query(
        gql`
          query {
            users {
              _id
              email
              password
            }
          }
        `
      )
      .expectNoErrors();

    expect(data.users).toHaveLength(3);
    expect(data.users[0])
      .toHaveProperty('_id')
      .toHaveProperty('email')
      .toHaveProperty('password')
      .not.toHaveProperty('ownedRealestates');
  });

  it('should get users with realestates', async () => {
    const { data } = await request
      .default(app)
      .query(
        gql`
          query {
            users {
              _id
              email
              password
              ownedRealestates {
                title
                address
                price
                owner {
                  email
                }
              }
            }
          }
        `
      )
      .expectNoErrors();

    expect(data.users).toHaveLength(3);
    expect(data.users.find((user) => user.email === 'exampleuser@hotmail.com'))
      .toHaveProperty('_id')
      .toHaveProperty('email')
      .toHaveProperty('password')
      .toHaveProperty('ownedRealestates')
      .toHaveProperty('ownedRealestates.length', 5)
      .toHaveProperty(
        'ownedRealestates.[0].owner.email',
        'exampleuser@hotmail.com'
      )
      .toHaveProperty(
        'ownedRealestates.[1].owner.email',
        'exampleuser@hotmail.com'
      );
  });
});
