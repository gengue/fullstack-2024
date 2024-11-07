import { Request, Response } from 'express';
import { getDb } from '../config/db';


export const getTours = async (req: Request, res: Response) => {
  try {
    const search = req.query.q;
    const db = getDb();

    const toursQuery = `
      SELECT * FROM tours
      WHERE name LIKE "%${search}%" OR description LIKE "%${search}%"
      ORDER BY rating DESC
    `;
    const tours = await db.all(toursQuery);
    const tourIds = tours.map(tour => `'${tour.id}'`).join(', ');

    const feedbacksQuery = `
      SELECT tour_id, full_name, comment, rating
      FROM feedbacks
      WHERE tour_id IN (${tourIds});
    `;
    const feedbacks = await db.all(feedbacksQuery);
    const toursWithFeedbacks = tours.map(tour => {
      const tourFeedbacks = feedbacks.filter(f => f.tour_id === tour.id);
      return { ...tour, feedbacks: tourFeedbacks };
    });

    res.json(toursWithFeedbacks);

  } catch (error) {
    console.error('Error fetching popular tours:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const db = getDb();

    const tourQuery = `
      SELECT * FROM tours 
      WHERE id = "${id}"
    `;
    const tour = await db.get(tourQuery);

    if (!tour) {
      res.status(404).json({ message: 'Tour not found' });
    }
    else {
      const feedbacksQuery = `
      SELECT full_name, comment, rating
      FROM feedbacks
      WHERE tour_id = "${id}"
    `;
      const feedbacks = await db.all(feedbacksQuery);
      const tourWithFeedbacks = { ...tour, feedbacks };
      res.json(tourWithFeedbacks);
    }
  } catch (error) {
    console.error('Error fetching popular tours:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPopularTours = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit;
    const db = getDb();

    const toursQuery = `
      SELECT t.id, t.name, t.description, t.rating, t.price, t.days, t.picture, COUNT(b.id) AS booking_count
      FROM tours t
      LEFT JOIN bookings b ON t.id = b.tour_id
      GROUP BY t.id
      ORDER BY booking_count DESC
      LIMIT ${limit};
    `;
    const popularTours = await db.all(toursQuery);

    const feedbacksQuery = `
      SELECT f.tour_id, f.full_name, f.comment, f.rating
      FROM feedbacks f
      WHERE f.tour_id IN (${popularTours.map(t => `'${t.id}'`).join(', ')});
    `;
    const feedbacks = await db.all(feedbacksQuery);

    const toursWithFeedbacks = popularTours.map(tour => {
      const tourFeedbacks = feedbacks.filter(f => f.tour_id === tour.id);
      return { ...tour, feedbacks: tourFeedbacks };
    });

    res.json(toursWithFeedbacks);
  } catch (error) {
    console.error('Error fetching popular tours:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTourFeedbacks = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const db = getDb();

    const query = `
     SELECT * FROM feedbacks
     WHERE tour_id = "${id}"
     ORDER BY rating DESC;
    `;

    const feedbacks = await db.all(query);

    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
