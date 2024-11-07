
export type Tour = {
  id: string;
  name: string;
  description: string;
  detail: string;
  rating: number;
  price: number;
  days: number;
  picture: string;
  feedbacks: Feedback[];
};

interface Feedback {
  id: string;
  tour_id: string;
  full_name: string;
  comment: string;
  rating: number;
}

const baseApiUrl = 'http://localhost:3000/api'

export const Tours = {
  getTours: async (query = ""): Promise<Tour[]> => {
    const response = await fetch(`${baseApiUrl}/tours?q=${query}`);
    const tours = await response.json();
    return tours;
  },
  getTour: async (id: string): Promise<Tour> => {
    const response = await fetch(`${baseApiUrl}/tours/${id}`);
    const tour = await response.json();
    return tour;
  },
  getPopularTours: async (limit = 10): Promise<Tour[]> => {
    const response = await fetch(`${baseApiUrl}/tours/popular?limit=${limit}`);
    const tours = await response.json();
    return tours;
  }
}
