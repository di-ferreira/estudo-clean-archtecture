import Customer from './Customer';
import Movie from './Movie';

export default class Rent {
  id: number;
  rent_date: Date;
  deliver_date: Date;
  customer: Customer;
  movies: Movie[];
  total: number;

  constructor(
    id: number,
    customer: { id: number; name: string; document: string },
    movies: {
      id: number;
      title: string;
      price_rental: number;
      available: boolean;
    }[]
  ) {
    this.id = id;
    this.customer = customer;
    this.rent_date = new Date();
  }
}
