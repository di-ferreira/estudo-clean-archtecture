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
      new Movie(2, 'The Matrix', 1, 4.0),
      new Movie(3, 'Day off Ferris Bueller', 0, 3.85),
    ];
  });

  it('should customer rent available movies', () => {
    const rentMovie = new CustomerRentMovie(
      customer,
      [movies[1]],
      repositoryMovie
    );
    const rentedMovie = rentMovie.execute();

    expect(rentedMovie).toBeInstanceOf(Rent);
    expect(rentedMovie.customer).toEqual(customer);
    expect(rentedMovie.movies.length).toBe(1);
    expect(rentedMovie.total).toEqual(movies[1].price);
  });

  it('should throw an error if no movies are available', () => {
    const rentMovie = new CustomerRentMovie(
      customer,
      [movies[2]],
      repositoryMovie
    );

    expect(() => rentMovie.execute()).toThrow(
      `Movie ${movies[2].title} is not available for rent`
    );
  });

  it('should count -1 for quantity movie', () => {
    const movie = movies[0];
    const rentMovie = new CustomerRentMovie(customer, [movie], repositoryMovie);
    const rentedMovie = rentMovie.execute();
    expect(rentedMovie.movies[0].quantity).toEqual(0);
  });

  it('should calculate total rent two movies', () => {
    const movie = movies[0];
    const movie2 = movies[1];
    const rentMovie = new CustomerRentMovie(
      customer,
      [movie, movie2],
      repositoryMovie
    );
    const rentedMovie = rentMovie.execute();
    expect(rentedMovie.movies.length).toEqual(2);
    expect(rentedMovie.total).toEqual(movie.price + movie2.price);
  });

  it('should return delivery date now +1', () => {
    const nowDate = new Date();
    const deliverDate = nowDate.setDate(nowDate.getDate() + 1);
    const movie = movies[0];
    const movie2 = movies[1];
    const rentMovie = new CustomerRentMovie(
      customer,
      [movie, movie2],
      repositoryMovie
    );
    const rentedMovie = rentMovie.execute();
    expect(rentedMovie.deliver_date).toEqual(deliverDate);
  });
});

