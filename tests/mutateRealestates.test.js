import request from 'supertest-graphql';
import gql from 'graphql-tag';
import dbHandler from './dbHandler.js';
import app from '../app.js';

describe('Real-estate mutation', () => {
  beforeAll(async () => await dbHandler.connect());

  afterAll(async () => await dbHandler.closeDatabase());

  it('should mutate real-estates', async () => {
    const ownerId = (await dbHandler.getUserByEmail('testuser@yahoo.com'))._id;

    const { data } = await request
      .default(app)
      .mutate(
        gql`
          mutation realestateCreate($ownerId: ID!) {
            realestateCreate(
              address: "addr"
              price: 12
              title: "my fazenda"
              owner: $ownerId
            ) {
              _id
              title
              price
              owner {
                _id
                email
                ownedRealestates {
                  title
                }
              }
            }
          }
        `
      )
      .variables({ ownerId: ownerId })
      .expectNoErrors();

    expect(data.realestateCreate)
      .toHaveProperty('title', 'my fazenda')
      .toHaveProperty('price', 12)
      .toHaveProperty('owner')
      .toHaveProperty('owner.ownedRealestates', [{ title: 'my fazenda' }]);

    expect(
      await dbHandler.getRealestateById(data.realestateCreate._id)
    ).toBeTruthy();
  });
});
