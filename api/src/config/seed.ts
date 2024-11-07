import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { faker } from '@faker-js/faker';

interface Tour {
  id: string;
  name: string;
  description: string;
  detail: string;
  rating: number;
  price: number;
  days: number;
  picture: string;
}

interface Booking {
  id: string;
  tour_id: string;
  name: string;
  email: string;
  booking_date: string;
  status: string;
  number_of_pax: number;
  total_price: number;
}

interface Feedback {
  id: string;
  tour_id: string;
  full_name: string;
  comment: string;
  rating: number;
}

export async function runSeed(db: Database<sqlite3.Database, sqlite3.Statement>) {
  console.log('Seeding database...');

  // Generate and insert a large number of fake records
  const fakeTrips: Tour[] = Array.from({ length: 1500 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName() + " Tour",
    description: faker.lorem.sentences(2),
    detail: faker.lorem.sentences(80),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    price: parseInt(faker.commerce.price({ min: 1000, max: 6000 })),
    days: faker.number.int({ min: 3, max: 15 }),
    picture: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'city' }),
  }));

  const insertTrip = await db.prepare(`
    INSERT INTO tours (id, name, description, detail, rating, price, days, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  await db.exec('BEGIN TRANSACTION');
  for (const trip of fakeTrips) {
    await insertTrip.run(trip.id, trip.name, trip.description, trip.detail, trip.rating, trip.price, trip.days, trip.picture);
  }
  await db.exec('COMMIT');

  const insertBooking = await db.prepare(`
    INSERT INTO bookings (id, tour_id, name, email, booking_date, status, number_of_pax, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  await db.exec('BEGIN TRANSACTION');

  const statuses = ['confirmed', 'pending', 'cancelled'];
  for (const tour of fakeTrips) {
    // Each trip gets between 1 to 30 bookings
    const bookingCount = faker.number.int({ min: 1, max: 120 });
    for (let i = 0; i < bookingCount; i++) {
      const totalPax = faker.number.int({ min: 1, max: 5 });
      const totalPrice = tour.price * totalPax;

      const booking: Booking = {
        id: faker.string.uuid(),
        tour_id: tour.id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        booking_date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
        status: statuses[faker.number.int({ min: 0, max: 2 })],
        number_of_pax: totalPax,
        total_price: totalPrice,
      };

      await insertBooking.run(
        booking.id,
        booking.tour_id,
        booking.name,
        booking.email,
        booking.booking_date,
        booking.status,
        booking.number_of_pax,
        booking.total_price
      );
    }
  }
  await db.exec('COMMIT');

  const insertFeedback = await db.prepare(`
    INSERT INTO feedbacks (id, tour_id, full_name, comment, rating) VALUES (?, ?, ?, ?, ?)
  `);

  await db.exec('BEGIN TRANSACTION');
  for (const tour of fakeTrips) {
    const feedbackCount = faker.number.int({ min: 2, max: 60 });
    for (let i = 0; i < feedbackCount; i++) {
      const feedback: Feedback = {
        id: faker.string.uuid(),
        tour_id: tour.id,
        full_name: faker.person.fullName(),
        comment: faker.lorem.sentences(2),
        rating: faker.number.int({ min: 1, max: 5 }),
      };

      await insertFeedback.run(
        feedback.id,
        feedback.tour_id,
        feedback.full_name,
        feedback.comment,
        feedback.rating
      );
    }
  }
  await db.exec('COMMIT');
}


