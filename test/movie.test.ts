import Customer from '../src/core/entity/Customer';
import Movie from '../src/core/entity/Movie';
import Rent from '../src/core/entity/Rent';
import MovieRepository from '../src/core/repository/MovieRepository';
import CustomerRentMovie from '../src/core/useCases/CustomerRentMovies';

describe('CustomerRentMovie Use Case', () => {
  let customer: Customer;
  let movies: Movie[];
  let repositoryMovie: MovieRepository;

  beforeEach(() => {
    repositoryMovie = {
      getMovie: function (id: number): Promise<Movie> {
        throw new Error('Function not implemented.');
      },

      saveMovie: async function (movie: Movie): Promise<Movie> {
        let newMovie: Movie = movie;
        newMovie.quantity = movie.quantity - 1;

        const result = new Promise<Movie>((resolve, reject) => {
          resolve(newMovie);
        });

        return result;
      },
    };

    customer = new Customer(1, 'John', '123.456.789-00');
    movies = [
      new Movie(1, 'Back to the Future', 2, 5.5),
      new Movie(2, 'The Matrix', 4, 4.0), // out of stock
    ];
  });

  it('should customer rent available movies', () => {
    const rentMovie = new CustomerRentMovie(
      customer,
      [movies[0]],
      repositoryMovie
    );
    const rentedMovie = rentMovie.execute();

    expect(rentedMovie).toBeInstanceOf(Rent);
    expect(rentedMovie.customer).toEqual(customer);
    expect(rentedMovie.movies.length).toBe(1);
    expect(rentedMovie.total).toEqual(5.5);
  });

  it('should throw an error if no movies are available', () => {
    const rentMovie = new CustomerRentMovie(
      customer,
      [movies[1]],
      repositoryMovie
    );

    expect(() => rentMovie.execute()).toThrow(
      'Movie The Matrix is not available for rent'
    );
  });

  it('should count -1 for quantity movie', () => {
    const movie = movies[0];
    const rentMovie = new CustomerRentMovie(customer, [movie], repositoryMovie);
    const rentedMovie = rentMovie.execute();
    expect(rentedMovie.movies[0].quantity).toEqual(0);
  });
});

