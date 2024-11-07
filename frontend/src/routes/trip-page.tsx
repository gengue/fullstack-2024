import { Link, useLoaderData } from "react-router-dom";
import { Tours } from "../data-access/tours";
import type { Params } from "react-router-dom";
import { Rating } from "../components/rating";
import { Feedback } from "../components/feedback";
import { TourCard } from "../components/tour-card";

export async function loader({ params }: { params: Params<"id"> }) {
  if (!params.id) {
    throw new Error("No ID provided");
  }
  const tour = await Tours.getTour(params.id);
  const popularTours = await Tours.getPopularTours(4);
  return { tour, popularTours };
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export function TripPage() {
  const { tour, popularTours } = useLoaderData() as LoaderData;
  const coverImg = tour.picture.replace('640', '900');

  return (
    <div >
      <h1>{tour.name}</h1>
      <p>{tour.description}</p>
      <img src={coverImg} alt={tour.name} style={{ marginBottom: '1rem' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span style={{ marginRight: '1rem' }}>{tour.days} days</span>
          <Rating rating={tour.rating} />
        </div>
        <div>
          <span style={{ marginRight: '1rem' }}>From <b>${tour.price}</b></span>
          <Link to={`/book/${tour.id}`}>
            <button>Book now</button>
          </Link>
        </div>
      </div>
      <p>{tour.detail}</p>
      <h2>Best sellers tours</h2>
      <p>You might be interestend in some of our best seller tours</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {popularTours.map((tour) => (
          <TourCard
            key={tour.id}
            id={tour.id}
            title={tour.name}
            sub={tour.description}
            rating={tour.rating}
            picture={tour.picture}
            days={tour.days}
            price={tour.price}
          />
        ))}
      </div>
      <h2>Reviews</h2>
      <p>What our customers say</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {tour.feedbacks.map(f => (
          <Feedback fullName={f.full_name} comment={f.comment} rating={f.rating} />
        ))}
      </div>
    </div>
  )
}
