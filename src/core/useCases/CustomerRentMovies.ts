import Rent from '../entity/Rent';

export default class CustomerRentMovie {
  customer: { name: string; document: string };
  movies: { id: string }[];
  constructor(rent: {
    name: string;
    document: string;
    movies: { title: string }[];
  }) {}

  execute() {
    return new Rent(
      1,
      {
        id: 1,
        name: this.customer.name,
        document: this.customer.document,
      },
      []
    );
  }
}
