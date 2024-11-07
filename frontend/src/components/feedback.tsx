import { Rating } from './rating'

type Props = {
  fullName: string;
  comment: string;
  rating: number;
}

export function Feedback({ fullName, comment, rating }: Props) {
  return (
    <div className="trip-card">
      <div style={{ display: 'flex', gap: '1rem', justifyItems: 'center', alignItems: 'center' }}>
        <img
          src={`https://avatar.iran.liara.run/username?username=${fullName}`}
          width="40px"
          height="40px"
        />
        <h3>{fullName}</h3>
      </div>
      <Rating rating={rating} />
      <p>{comment}</p>
    </div>
  )
}

