export default class Movie {
  available: boolean = true;
  constructor(
    readonly id: number,
    readonly title: string,
    public quantity: number,
    readonly price: number
  ) {
    this.available = this.verifyAvailable();
  }

  private verifyAvailable(): boolean {
    let result: boolean = false;

    if (this.quantity === 0) {
      result = true;
    }

    return result;
  }
}

