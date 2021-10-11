interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size(): number;
}

export class Queue<T> implements IQueue<T> {
  private store: T[] = [];

  constructor(private capacity: number = Infinity) {}

  public enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue max capacity reached");
    }
    this.store.push(item);
  }
  public dequeue(): T | undefined {
    return this.store.shift();
  }
  public size(): number {
    return this.store.length;
  }
}
