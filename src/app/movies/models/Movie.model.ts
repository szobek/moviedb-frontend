export class Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  description: string;

  constructor(id: number, title: string, year: number, rating: number, description: string){
    this.id = id;
    this.title = title;
    this.year = year;
    this.rating = rating;
    this.description = description;
  }
}
