import Customer from '../entity/Customer';
import Movie from '../entity/Movie';
import Rent from '../entity/Rent';

export default class CustomerRentMovie {
  constructor(private customer: Customer, private movies: Movie[]) {}

  execute(): Rent {
    this.movies.forEach((movie) => {
      if (!movie.available) {
        throw new Error(`Movie ${movie.title} is not available for rent`);
      }
    });

    return new Rent(1, this.customer, this.movies);
  }
}

