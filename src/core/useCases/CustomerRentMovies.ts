import Customer from '../entity/Customer';
import Movie from '../entity/Movie';
import Rent from '../entity/Rent';
import MovieRepository from '../repository/MovieRepository';

export default class CustomerRentMovie {
  constructor(
    private customer: Customer,
    private movies: Movie[],
    private movieRepository: MovieRepository
  ) {}

  execute(): Rent {
    this.movies.forEach((movie) => {
      if (movie.available) {
        throw new Error(`Movie ${movie.title} is not available for rent`);
      }
      movie.quantity = movie.quantity - 1;
      this.movieRepository.saveMovie(movie);
    });

    return new Rent(1, this.customer, this.movies);
  }
}

