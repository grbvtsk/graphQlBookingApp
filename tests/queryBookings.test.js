import request from 'supertest-graphql';
import gql from 'graphql-tag';
import dbHandler from './dbHandler.js';
import app from '../app';

describe('GET', () => {
  beforeAll(async () => await dbHandler.connect());

  afterAll(async () => await dbHandler.closeDatabase());

  it('should get bookings', async () => {
    const { data } = await request
      .default(app)
      .query(
        gql`
          query {
            bookings {
              _id
              createdAt
              updatedAt
              from
              to
              user {
                email
                ownedRealestates {
                  title
                }
              }
              realestate {
                title
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

    expect(data.bookings).toHaveLength(3);
    expect(
      data.bookings.find(
        (booking) => booking.realestate.title === 'Cozy Studio in Downtown'
      )
    )
      .toHaveProperty('_id')
      .toHaveProperty('createdAt')
      .toHaveProperty('updatedAt')
      .toHaveProperty('from', '2023-05-10T00:00:00.000Z')
      .toHaveProperty('to', '2023-05-17T00:00:00.000Z')
      .toHaveProperty('user')
      .toHaveProperty('user.email', 'anotheremail@gmail.com')
      .toHaveProperty('user.ownedRealestates', [])
      .toHaveProperty('user.ownedRealestates.length', 0)
      .toHaveProperty('realestate.price', 800)
      .toHaveProperty('realestate.owner.email', 'exampleuser@hotmail.com');
  });
});
