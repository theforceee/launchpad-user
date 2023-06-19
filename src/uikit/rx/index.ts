export class Subject<D> {
  private observers: ((data: D) => any)[] = [];

  constructor(private data: D) {}

  getValue() {
    return this.data;
  }

  next(data: D) {
    this.data = data;
    this.observers.forEach((obs) => obs(data));
  }

  subscribe(obs: (data: D) => any) {
    this.observers.push(obs);
  }
}
