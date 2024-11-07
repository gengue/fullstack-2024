import { useRouteLoaderData } from "react-router-dom";
import { LoaderData } from "./root";
import { TourCard } from "../components/tour-card";


export function HomePage() {
  const { tours, q } = useRouteLoaderData("root") as LoaderData;
  return (
    <div>
      {q ? <h2>Results of {q}</h2> : <h2>Home</h2>}
      {tours.length === 0 ? (
        <p>No tours found</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {tours.map((tour) => (
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

      )}
    </div>
  )
}
