import Movie from '../entity/Movie';

export default interface MovieRepository {
  getMovie(id: number): Promise<Movie>;
  saveMovie(movie: Movie): Promise<Movie>;
}

