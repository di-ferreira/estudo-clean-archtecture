import Customer from './Customer';
import Movie from './Movie';

export default class Rent {
  id: number;
  rent_date: Date;
  deliver_date: Date;
  customer: Customer;
  movies: Movie[];
  total: number;

  constructor(id: number, customer: Customer, movies: Movie[]) {
    this.id = id;
    this.customer = customer;
    this.movies = movies;
    this.rent_date = new Date();
    this.deliver_date = null;
    this.total = this.calculateTotal();
  }

  private calculateTotal(): number {
    return this.movies.reduce((total, movie) => total + movie.price, 0);
  }

  private deliver() {
    this.deliver_date = new Date();
  }
}

