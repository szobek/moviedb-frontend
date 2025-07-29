export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  description: string;
  genres: Array<string>;
  actors: Array<string>;
  posterUrl: string;
  director:string
}
