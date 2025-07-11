export interface Movie {
  movie_id: number;
  title: string;
  year: number;
  rating: number;
  description: string;
  genres: Array<string>;
  actors: Array<string>;
}
