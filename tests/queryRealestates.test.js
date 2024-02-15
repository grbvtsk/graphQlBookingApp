import request from 'supertest-graphql';
import gql from 'graphql-tag';
import dbHandler from './dbHandler.js';
import app from '../app';

describe('GET', () => {
  beforeAll(async () => await dbHandler.connect());

  afterAll(async () => await dbHandler.closeDatabase());

  it('should get realestates', async () => {
    const { data } = await request
      .default(app)
      .query(
        gql`
          query {
            realestates {
              _id
              title
              address
              price
              owner {
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
          }
        `
      )
      .expectNoErrors();

    expect(data.realestates).toHaveLength(5);
    expect(
      data.realestates.find(
        (realestate) => realestate.title === 'Cozy Studio in Downtown'
      )
    )
      .toHaveProperty('_id')
      .toHaveProperty('title')
      .toHaveProperty('address')
      .toHaveProperty('price')
      .toHaveProperty('owner')
      .toHaveProperty('owner._id')
      .toHaveProperty('owner.email')
      .toHaveProperty('owner.password')
      .toHaveProperty('owner.ownedRealestates')
      .toHaveProperty('owner.ownedRealestates.length', 5)
      .toHaveProperty(
        'owner.ownedRealestates',
        {
          address: '123 Main St, Anytown USA',
          owner: {
            email: 'exampleuser@hotmail.com',
          },
          price: 1200,
          title: 'Spacious 2-Bedroom Apartment',
        },
        {
          address: '456 Market St, Anytown USA',
          owner: {
            email: 'exampleuser@hotmail.com',
          },
          price: 800,
          title: 'Cozy Studio in Downtown',
        },
        {
          address: '789 Oak Ave, Anytown USA',
          owner: {
            email: 'exampleuser@hotmail.com',
          },
          price: 2500,
          title: 'Luxurious 3-Bedroom House',
        },
        {
          address: '101 Elm St, Anytown USA',
          owner: {
            email: 'exampleuser@hotmail.com',
          },
          price: 1500,
          title: 'Charming Bungalow with Garden',
        },
        {
          address: '555 Pine St, Anytown USA',
          owner: {
            email: 'exampleuser@hotmail.com',
          },
          price: 1800,
          title: 'Modern Condo with City View',
        }
      );
  });
});
