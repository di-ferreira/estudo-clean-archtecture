import Customer from '../src/core/entity/Customer';
import Movie from '../src/core/entity/Movie';
import Rent from '../src/core/entity/Rent';
import CustomerRentMovie from '../src/core/useCases/CustomerRentMovies';

describe('CustomerRentMovie Use Case', () => {
  let customer: Customer;
  let movies: Movie[];

  beforeEach(() => {
    customer = new Customer(1, 'John', '123.456.789-00');
    movies = [
      new Movie(1, 'Back to the Future', 3, 5.5, true),
      new Movie(2, 'The Matrix', 4, 4.0, false), // out of stock
    ];
  });

  it('should customer rent available movies', () => {
    const rentMovie = new CustomerRentMovie(customer, [movies[0]]);
    const rentedMovie = rentMovie.execute();

    expect(rentedMovie).toBeInstanceOf(Rent);
    expect(rentedMovie.customer).toEqual(customer);
    expect(rentedMovie.movies.length).toBe(1);
    expect(rentedMovie.total).toEqual(5.5);
  });

  it('should throw an error if no movies are available', () => {
    const rentMovie = new CustomerRentMovie(customer, [movies[1]]);

    expect(() => rentMovie.execute()).toThrow(
      'Movie The Matrix is not available for rent'
    );
  });
});

