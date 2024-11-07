import { IoStarSharp } from "react-icons/io5";

export function Rating({ rating }: { rating: number }) {
  const stars = Array(5).fill(0).map((_, i) => (
    <IoStarSharp key={i} color={i < rating ? "gold" : "gray"} />
  ));
  return <span>{stars}{rating}</span>;

}
