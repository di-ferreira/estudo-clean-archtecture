export default class Movie {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly quantity: number,
    readonly price: number,
    readonly available: boolean
  ) {}
}
