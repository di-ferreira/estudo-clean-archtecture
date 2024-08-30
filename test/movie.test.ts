import CustomerRentMovie from '../src/core/useCases/CustomerRentMovies';
describe('Test rent movie', () => {
  test('should customer rent a movie', () => {
    const customer = { name: 'John', document: '123.456.789-00' };
    const movie = {
      title: 'Back to the Future',
      quantity: 3,
      available_quantity: 1,
      price_rental: 5.5,
    };

    const rentMovie = new CustomerRentMovie({
      name: customer.name,
      document: customer.document,
      movies: [{ title: movie.title }],
    });

    const rentedMovie = rentMovie.execute();

    expect(rentedMovie.total).toEqual(5.5);
  });
});
