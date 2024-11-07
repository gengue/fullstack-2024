import { Link } from "react-router-dom";
import { Rating } from './rating'

type Props = {
  id: string;
  title: string;
  picture: string;
  days: number;
  rating: number;
  price: number;
  sub?: string;
}

export function TourCard({ id, title, sub, picture, days, rating, price }: Props) {
  return (
    <div style={{ width: '380px' }} className="trip-card">
      <Link to={`/tours/${id}`}>
        <h2>{title}</h2>
        <img src={picture} style={{ objectFit: 'cover', width: '380px', height: '200px', marginBottom: '0.2rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Rating rating={rating} />
          <small >{days} days</small>
        </div>
      </Link>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p>{sub}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>From <b>${price}</b></span>
          <Link to={`/book/${id}`}>
            <button>Book now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

