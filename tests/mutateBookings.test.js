import request from 'supertest-graphql';
import gql from 'graphql-tag';
import dbHandler from './dbHandler.js';
import app from '../app.js';

describe('booking mutation', () => {
  beforeAll(async () => await dbHandler.connect());

  afterAll(async () => await dbHandler.closeDatabase());

  it('should create new booking', async () => {
    const userId = (await dbHandler.getUserByEmail('testuser@yahoo.com'))._id;
    const realestateId = (
      await dbHandler.getRealestateByTitle('Cozy Studio in Downtown')
    )._id;

    const { data } = await request
      .default(app)
      .mutate(
        gql`
          mutation bookingCreate($realestateId: ID!, $userId: ID!) {
            bookingCreate(realestateId: $realestateId, userId: $userId) {
              _id
              realestate {
                title
              }
              user {
                email
              }
            }
          }
        `
      )
      .variables({ userId: userId, realestateId: realestateId })
      .expectNoErrors();

    expect(data.bookingCreate)
      .toHaveProperty('_id')
      .toHaveProperty('user.email', 'testuser@yahoo.com')
      .toHaveProperty('realestate.title', 'Cozy Studio in Downtown');

    expect(await dbHandler.getBookingById(data.bookingCreate._id)).toBeTruthy();
  });

  it('should delete existing booking', async () => {
    const booking = await dbHandler.getOneBooking();

    const { data } = await request
      .default(app)
      .mutate(
        gql`
          mutation bookingDelete($bookingId: ID!) {
            bookingDelete(bookingId: $bookingId) {
              _id
              user {
                email
              }
              realestate {
                title
              }
            }
          }
        `
      )
      .variables({ bookingId: booking._id })
      .expectNoErrors();

    expect(data.bookingDelete)
      .toHaveProperty('_id', booking._id.toString())
      .toHaveProperty('user.email', booking.user.email)
      .toHaveProperty('realestate.title', booking.realestate.title);

    expect(await dbHandler.getBookingById(booking._id)).toBeFalsy();
  });
});
